<template>
	<view class="order_details-box">
		<view class="order-time-box">
			<u-count-down :time="30 * 60 * 60 * 1000" format="HH:mm:ss"></u-count-down>
		</view>
		<view class="top-box">
			<view class="rail"></view>

		</view>

	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				orderInfo: {}
			};
		},
		onLoad(e) {
			// this.getData(e.id)
		},
		methods: {
			async getData(id) {
				const goodsTemp = await db.collection("cy_goods").field("_id,good_name,style,status").getTemp()
				const orderTemp = await db.collection("cy-goods-orders").where({
					_id: id
				}).getTemp()
				uni.showLoading({
					title: "加载中..."
				})
				db.collection(orderTemp, goodsTemp).get().then(res => {
					this.orderInfo = res.result.data[0]
					uni.hideLoading()
					console.log(this.orderInfo);

				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $bgc-grey-1;
	}

	.order-time-box {
		height: 200rpx;
		background-color: $bgc-purple;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		/deep/.u-count-down__text{
			font-size: 18px;
 		}
	}

	.top-box {
		.rail {
			height: 20rpx;
			width: 95vw;
			background-color: $bgc-grey-2;
			border-radius: 30rpx;
			transform: translateY(30rpx);
			margin: 0 auto;
		}

		.rail::after {
			content: "";
			width: 90vw;
			margin: 0 auto;
			height: 500rpx;
			display: block;
			transform: translateY(10rpx);
			background-color: $bgc-white;
		}

	}
</style>