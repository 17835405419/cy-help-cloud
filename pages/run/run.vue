<template>
	<view class="run-box">
		<view class="top-image-box">
			<image src="https://u1.0xiao.cn/3cfoodcn/info/image/20210412/6073fa6e36c2a.png" mode="top-img"></image>
		</view>
		<view class="select-list-box">
			<u-grid :border="true">
				<u-grid-item v-for="(item,index) in baseList" :key="index" @click="runClick(item)" >
					<view class="iconfont" :class="item.icon"></view>
					<text class="grid-text">{{item.name}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="content-box">
			<view class="content-title">
				最新发布
			</view>
			<view class="content">
				<run-card v-for="(item,index) in tasklist" :key="index" :taskInfo="item" />
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				baseList: [],
				tasklist:[]
			};
		},
		onLoad() {
			this.getDate()
			this.getTaskData()
		},
		methods: {
			// 获取列表数据
			async getDate() {
				// 由于该数据变动较少 所以可以缓存时间较长 
				let taskCategories =  uni.getStorageSync("task-categories")
				if(taskCategories?.length > 0){
					this.baseList = taskCategories
					return
				}
				// 否则重新请求接口
				const {
					result
				} = await db.collection("cy-task-categories").get()
				this.baseList = result.data
				// 性能优化 本地存一份
				uni.setStorageSync("task-categories",result.data)
			},
			
			// 获取最新发布数据
			async  getTaskData(){
				let taskTemp =await db.collection("cy-task").getTemp()
				let authorTemp = await db.collection("uni-id-users").field("_id,avatar_file").getTemp()
				let cateTemp = await db.collection("cy-task-categories").getTemp()
				let {result} = await db.collection(taskTemp,cateTemp,authorTemp).get()
				this.tasklist = result.data
				console.log(this.tasklist);
			},
			
			// 跳转到任务列表
			runClick(item){

				uni.navigateTo({
					url:`/pages/task_list/task_list?id=${item._id}&cateName=${item.name}`,
					
				})
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.run-box {
		.top-image-box {
			width: 100%;
			height: 420rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.select-list-box {
			margin-top: 30rpx;

			.iconfont {
				font-size: 60rpx;
				color: $font-purple;
			}

			.grid-text {
				color: $font-black;
				font-size: 14px;
				padding: 5rpx 20rpx 20rpx 20rpx;
			}
		}

		.content-box {
			border-top: 1px solid #eee;

			.content-title {
				font-size: 13px;
				height: 100rpx;
				line-height: 140rpx;
				margin-left: 20rpx;
				font-weight: 800;
			}
		}
	}
</style>