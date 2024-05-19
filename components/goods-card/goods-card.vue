<template>

	<view class="goods_item" @click="gotoGoodsDetails">
		<u-image class="u-skeleton-fillet" width="100%" height="300rpx" :src="goodsInfo.goods_thumb" />

		<view class="title u-line-1 u-skeleton-rect ">
			{{goodsInfo.good_name}}
		</view>
		<view class="goods_sbox">
			<view class="price">￥ {{goodsInfo.price}}</view>
			<u-tag :text="goodsInfo.style === 0 ? '出售' : '求购' " size="mini" :type="goodsInfo.style === 0 ? 'success' : 'warning'"></u-tag>
		</view>
	</view>

</template>

<script>
	export default {
		name: "goods-card",
		props: {
			goodsInfo:{ 
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			gotoGoodsDetails(){
				uni.navigateTo({
					url:`/pages/goods_details/goods_details?id=${this.goodsInfo._id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods_item {
		box-sizing: border-box; //怪异盒子
		width: calc(50vw - 20rpx);
		padding: 20rpx;
		margin: 15rpx 10rpx;
		box-shadow: 0 12rpx 20rpx 0 rgba(0, 0, 0, .1);

		.title {
			margin: 20rpx 0;
			font-weight: 500;
			font-size: 14px;
			width: 100%;
			
		}
		.goods_sbox {
			color: $font-black;
			font-size: 13px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
</style>