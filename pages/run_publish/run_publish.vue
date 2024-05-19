<template>
	<view class="run-box">
		<view class="top-box">

			<view class="title-box">
				<text class="iconfont icon-yaoqing-neirong"></text>
				<text>跑腿内容</text>
			</view>
			<view class="content-box">
				<u--textarea class="textarea" v-model="task.task_desc" placeholder="请输入任务内容"></u--textarea>
			</view>
			<view class="list_group">

				<view class="item">
					<view class="left">
						<text class="iconfont icon-didian"></text>
						<text>起点</text>
					</view>
					<input type="text" v-model="task.start" placeholder="请输入起点(非必填)" maxlength="20">
				</view>
				<view class="item">
					<view class="left">
						<text class="iconfont icon-didian"></text>
						<text>终点</text>
					</view>
					<input type="text" v-model="task.end" placeholder="请输入终点(非必填)" maxlength="20">
				</view>
				<view class="item">
					<view class="left">
						<text class="iconfont icon-jine"></text>
						<text>金额</text>
					</view>
					<input type="number" v-model.number="task.price" placeholder="请输入金额" maxlength="9 ">
				</view>
				<view class="item">
					<view class="left">
						<text class="iconfont icon-category"></text>
						<text>任务类别</text>
					</view>
					<input type="text" :placeholder="catePlaceholder" disabled @click="clickCate">
				</view>
				<view class="item">
					<view class="left">
						<text class="iconfont icon-yaoqing-neirong"></text>
						<text>备注信息</text>
					</view>
					<input type="text" v-model="task.task_note" placeholder="该项(非必填)" maxlength="20">
				</view>
			</view>

		</view>

		<view class="bottom-box">
			<text class="title">跑腿费</text>
			<text class="price">{{task.price || 0 }} 元</text>

			<view class="botton-box">
				<u-button text="立刻发布" color="#aaaaff" shape="circle" @click="pubilsh"
					:disabled="bottonDisabled"></u-button>
			</view>
		</view>
		<!-- 任务类别 -->
		<u-popup :show="cateShow" mode="bottom" @close="close" round="15">
			<view class="cate-list" v-for="(item,index) in baseList" :key="index" @click="selectCate(item)">
				<text class="iconfont" :class="item.icon"></text>
				<text>{{item.name}}</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				task: {
					task_desc: "",
					start: "",
					end: "",
					price: null,
					category_id: null,
					task_note: ""
				},
				baseList: [],
				cateShow: false, //弹出层控制
				catePlaceholder: "请选择任务类别",
				bottonDisabled: true
			};
		},
		onLoad() {
			this.getCate()
		},
		computed: {
			isMustFill() {
				const {
					task_desc,
					price,
					category_id
				} = this.task
				return {
					task_desc,
					price,
					category_id
				}
			}
		},
		watch: {
			isMustFill: {
				handler(news, olds) {
					if (news.task_desc != "" && news.price != null && news.category_id != null) {
						this.bottonDisabled = false
					} else {
						this.bottonDisabled = true
					}
				},
				deep: true
			}
		},
		methods: {
			/*
			    todo  该方法之后可以提取出来 
			 */
			async getCate() {
				// 由于该数据变动较少 所以可以缓存时间较长
				let taskCategories = uni.getStorageSync("task-categories")
				if (taskCategories?.length > 0) {
					this.baseList = taskCategories
					return
				}
				// 否则重新请求接口
				const {
					result
				} = await db.collection("cy-task-categories").get()
				this.baseList = result.data
				// 性能优化 本地存一份
				uni.setStorageSync("task-categories", result.data)
			},
			clickCate() {
				this.cateShow = true
			},
			close() {
				this.cateShow = false
			},
			// 选择任务类别
			selectCate(item) {
				this.catePlaceholder = item.name
				this.task.category_id = item._id
				this.cateShow = false
			},
			pubilsh() {
				uni.showLoading({
					title: "发布中..."
				})
				db.collection("cy-task").add({
					...this.task
				}).then(res => {	
					uni.hideLoading()
					uni.showToast({
						title: "发布成功"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/run/run"
						})
					}, 300)
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						title:"发布失败",
						icon:"error"
					})
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $bgc-grey-1 ;
	}

	.run-box {
		display: flex;
		flex-direction: column;
	}

	.top-box {
		width: 95vw;
		margin: 25rpx auto;
		border: 1px solid #eee;
		border-radius: 30rpx;
		background-color: $bgc-white;

		// 标题
		.title-box {
			font-size: 15px;
			color: $font-black;
			padding: 30rpx;

			.iconfont {
				padding: 0 20rpx 0 0;
			}
		}

		// 内容
		.textarea {
			margin: 20rpx 30rpx;
			min-height: 200rpx;
			border-radius: 30rpx;
		}

		// 列表组
		.list_group {
			font-size: 13px;
			color: $font-black;

			.item {
				padding: 20rpx 0;
				margin: 0 30rpx;
				border-top: 1px solid #eee;
				display: flex;
				justify-content: space-between;
				align-items: center;

				// 输入框样式
				input {
					font-size: 12px;
				}

				&:nth-child(3) .iconfont {
					font-size: 14px;
				}
			}

			.iconfont {
				padding: 0 20rpx 0 0;
			}

		}

	}

	.bottom-box {
		height: 400rpx;
		width: 95vw;
		border: 1px solid #eee;
		border-radius: 30rpx;
		background-color: $bgc-white;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		font-size: 25px;

		.title {
			color: $font-black;
			letter-spacing: 5rpx;
		}

		.price {
			color: $font-red;
			margin-top: -30rpx;
		}

		.botton-box {
			width: 90vw;
		}
	}

	// 任务列表弹出框
	.cate-list {
		padding: 20rpx;
		font-size: 13px;
		color: $font-black;
		margin: 0 30rpx;
		border-bottom: 1px solid #eee;

		text {
			padding: 10rpx;
			letter-spacing: 5rpx;
		}
	}
</style>