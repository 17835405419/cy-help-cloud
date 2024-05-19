<template>
	<view class="order_list-box">
		<u-empty class="empty" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png" :show="emptyShow">
		</u-empty>
		<view class="order_list-item" v-for="(item,index) in orderList" :key="index">
			<text class=".u-line-1">订单号：{{item.order_num}}</text>
			<text class=".u-line-1">产品名称：{{item.goods_id[0].good_name}}</text>
			<text class=".u-line-1">价格：<text class="price">¥ {{item.total_fee}}</text></text>
			<text class=".u-line-1">备注：{{item.description || "暂无备注"}}</text>
			<text class=".u-line-1">创建日期：{{$u.timeFormat(item.create_date, 'yyyy-mm-dd')}}</text>
			<text class=".u-line-1">订单状态：
				<text v-if="item.status === -1 " style="color:grey">已关闭</text>
				<text v-else-if="item.status === 0 " style="color:red">未完成</text>
				<text v-else="item.status === 1 " style="color:blue">已完成</text>
			</text>

			<view class="button-box">
				<u-button :plain="true" type="primary" text="查看详情" size="mini" @click="gotoDetails(item._id)"> </u-button>
			</view>
			<view class="tag">
				<u-tag :text="item.goods_id[0].style === 0 ? '出售' : '求购' " size="mini"
					:type="item.goods_id[0].style === 0 ? 'success' : 'warning'"></u-tag>
			</view>


		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				orderList: [],
				emptyShow: false,
			};
		},
		onLoad() {
			this.getData()
		},

		methods: {
			async getData() {
				const goodsTemp = await db.collection("cy_goods").field("_id,good_name,style").getTemp()
				const orderTemp = await db.collection("cy-goods-orders").getTemp()
				uni.showLoading({
					title: "加载中..."
				})
				db.collection(orderTemp, goodsTemp).field(
					"_id,create_date,description,goods_id,order_num,status,total_fee").get().then(res => {
					this.orderList = res.result.data
					uni.hideLoading()
					if (this.orderList.length === 0) this.emptyShow = true
					
				})
			},

			gotoDetails(id) {
				uni.navigateTo({
					url: `/pages/order_details/order_details?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $bgc-grey-1;
	}
	.empty{
		height: calc( 100vh - var(--window-top)); 
		background-color: $bgc-white;
	}


	.order_list-item {
		position: relative;
		background-color: $bgc-white;
		display: flex;
		flex-direction: column;
		color: $font-black;
		font-size: 13px;
		margin: 20rpx 10rpx 0 10rpx;
		border-radius: 10rpx;

		text {
			padding: 10rpx;
			width: calc(100vw - 40rpx);

			&:first-child {
				padding-top: 20rpx;
			}
		}

		.price {
			color: $font-red;
		}

		.button-box {
			position: relative;
			border-top: 1px solid #eee;
			height: 70rpx;
			display: flex;
			align-items: center;

			.u-button {
				position: absolute;
				right: 30rpx;
				width: 150rpx;
				height: 55rpx;
			}
		}

		.tag {
			position: absolute;
			top: 20rpx;
			right: 20rpx;

		}

	}
</style>