<template>
	<view class="order-complete-box">
		<view class="top">
			<text class="iconfont icon-chenggong"></text>
			<text class="title">商品购买成功</text>
			<view class="botton-box">
				<u-button type="primary" text="继续选购" :plain="true" @click="gotoIndex"></u-button>
				<u-button type="primary" text="获取联系方式" @click="getContactInfo"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			gotoIndex(){
				// 跳转到首页
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			getContactInfo(){
				// 获取联系方式
				console.log(123);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.iconfont {
			font-size: 80px;
			color: $font-red;
		}

		.botton-box {
			display: flex;
			padding-top: 150rpx;

			.u-button {
				width: 300rpx;
				margin: 0 20rpx;
			}
		}
	}
</style>