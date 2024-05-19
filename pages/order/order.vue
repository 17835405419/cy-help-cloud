<template>
	<view class="order-box">
		<view class="top-box">
			<view class="left">
				<image :src="orderInfo.goods_thumb" mode=""></image>
			</view>
			<view class="right">
				<text class="u-line-1">{{orderInfo.good_name}}</text>
				<text class="price">¥ {{orderInfo.price}}</text>
			</view>
		</view>
		<view class="group">
			<u-cell title="商品金额" :value="'¥'+orderInfo.price"></u-cell>
			<u-cell title="商品数量" value="x1"></u-cell>
			<u-cell title="支付方式" :isLink="true" @click="$u.toast('本小程序暂不提供在线支付,请下单后获取卖家联系方式')"></u-cell>
			<u-cell title="备注">
				<u-input type="text" border="none" v-model="orderDesc" slot="value" placeholder="请填写备注(非必填)" />
			</u-cell>
		</view>
		<view class="tabber-box">
			<view>
				合计：
				<text>¥{{orderInfo.price}}</text>
			</view>
			<view class="botton">
				<u-button text="确认购买" type="primary" @click="toOrderConfirm"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject("utilsObj", {
		customUI: false
	})
	export default {
		data() {
			return {
				orderInfo: {},
				orderDesc: "" //订单备注
			};
		},
		onLoad(e) {
			this.orderInfo = JSON.parse(e.orderInfo)
		},
		methods: {
			async toOrderConfirm() {
				const {
					confirm
				} = await uni.showModal({
					title: "是否确认购买",
				})
				if (confirm) {
					const {
						result
					} = await db.collection("cy-goods-orders").add({
						order_num: 'cy' + uni.$u.guid(12, false, 10),
						goods_id: this.orderInfo._id,
						type: "goods",
						total_fee: this.orderInfo.price,
						description: this.orderDesc
					})
					if (result.errCode === 0) {
						// 修改商品状态
						const {
							updated
						} = await utilsObj.updateGoodsStatus(this.orderInfo._id, 3)
						// 如果修改成功 则跳转
						if (updated === 1) return uni.reLaunch({
							url: "/pages/order_complete/order_complete"
						})
					}
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $bgc-grey-1;
		// height:calc(100vh - var(--window-top));
	}

	.order-box {

		// min-height: calc(100vh - var(--window-top));
	}

	.top-box {
		height: 300rpx;
		background-color: $bgc-white;
		display: flex;
		align-items: center;
		transform: translateY(20rpx);

		.left {
			width: 230rpx;
			height: 230rpx;
			padding: 0 20rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.right {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 230rpx;

			text {
				width: 420rpx;
			}

			.price {
				color: $font-red;
			}
		}
	}

	.group {
		margin-top: 40rpx;
		background-color: $bgc-white;
	}

	.tabber-box {
		height: 100rpx;
		background-color: $bgc-white;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;

		text {
			color: $font-red;
		}

		.botton {
			width: 150rpx;
		}
	}
</style>