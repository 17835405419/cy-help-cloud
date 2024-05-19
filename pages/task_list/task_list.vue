<template>
	<view class="list-box">
		<u-empty class="empty" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :show="emptyShow">
		</u-empty>
		<run-card v-for="(item,index) in taskList" :key="index" :taskInfo="item" />
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				category_id: null,
				taskList: [],
				emptyShow: false,
			};
		},
		onLoad(e) {
			this.category_id = e.id
			uni.setNavigationBarTitle({
				title: e.cateName
			})

			this.getData()
		},
		methods: {
			async getData() {
				uni.showLoading({
					title: "正在加载中..."
				})
				let taskTemp = await db.collection("cy-task").where({
					category_id: this.category_id
				}).getTemp()
				let authorTemp = await db.collection("uni-id-users").field("_id,avatar_file").getTemp()
				let cateTemp = await db.collection("cy-task-categories").getTemp()
				let {
					result
				} = await db.collection(taskTemp, cateTemp, authorTemp).get()
				uni.hideLoading()
				this.taskList = result.data
				if (this.taskList.length == 0) return this.emptyShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>

	.list-box {
		.empty{
			height: calc( 100vh - var(--window-top)); 
		}
	} 
</style>