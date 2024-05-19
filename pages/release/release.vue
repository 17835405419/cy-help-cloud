<template>
	<view class="release-box">
		<view class="topbgc-box">
			<image src="https://pic.616pic.com/bg_w1180/00/04/83/6u1irQETGb.jpg" mode="topbgc-box"></image>
		</view>
		<view class="release-content">
			<view class="common-item idle-shop-box" @click="gotoPage('/pages/idle_publish/idle_publish')">
				<text class="iconfont icon-xianzhi"></text>
				<text>发布闲置</text>
			</view>
			<view class="common-item wantbuy-box" @click="gotoPage('/pages/want_buy/want_buy')">
				<text class="iconfont icon-qiugou2"></text>
				<text>意向求购</text>
			</view>
			<view class="common-item run-errand-box" @click="gotoPage('/pages/run_publish/run_publish')">
				<text class="iconfont icon-renwu"></text>
				<text>跑腿任务</text>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		store
	} from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		data() {
			return {

			};

		},
		methods: {
			gotoPage(url) {
				if (!store.hasLogin) return uni.showToast({title: "请您先登录...",icon:"error"})
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.release-box {
		.topbgc-box {
			width: 100%;
			height: 420rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.release-content {
			display: flex;
			justify-content: space-evenly;
			flex-wrap: wrap;

			// 子选项公共样式
			.common-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 300rpx;
				height: 300rpx;
				box-shadow: 0 0 20px 2px #eee;
				border-radius: 30rpx;
				background-color: #8EC5FC;
				background-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%);
				margin-top: 40rpx;

				.iconfont {
					font-size: 38px;
					margin-bottom: 20rpx;
					color: $font-darkblue;
				}
			}

			// 给外层元素填加一个伪类
			&:after {
				content: "";
				width: 300rpx;
				height: 300rpx;
			}
		}



	}
</style>