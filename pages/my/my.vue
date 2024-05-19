<template>
	<view class="user-box">
		<view class="top-box">
			<view class="group" @click="toUserInfo">
				<view class="userinfo">
					<view class="avatar-box">
						<image v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url"
							:src="userInfo.avatar_file.url" mode="aspectFill"></image>
						<image v-else src="../../static/images/user-default.jpg" mode="aspectFill"></image>
					</view>
					<view class="text" v-if="hasLogin">
						<view class="nickname">{{userInfo.nickname||userInfo.username||userInfo.mobile||"请先设置昵称"}}
						</view>
					</view>
					<view class="text" v-else>
						<view class="nickname">点击登录</view>
					</view>

				</view>
			</view>
			<view class="bg">
				<image v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url" :src="userInfo.avatar_file.url"
					mode="aspectFill"></image>
				<image v-else src="../../static/images/user-default.jpg" mode="aspectFill"></image>
			</view>
		</view>

		<view class="main">

			<view class="list">

				<view class="item">
					<view class="left"><text class="text">发布列表</text>
					</view>
					
				</view>
				<view class="item" @click="$u.route('/pages/order_list/order_list')">
					<view class="left"><text class="iconfont icon-a-106-xihuan"></text><text class="text">订单列表</text>
					</view>
				
				</view>
				<view class="item">
					<view class="left"><text class="iconfont icon-a-21-xiugai"></text><text class="text">接单列表</text>
					</view>
		
				</view>
				<view class="item">
					<view class="left"><text class="iconfont icon-a-5-xinxi"></text><text class="text">意见反馈</text>
					</view>
				
				</view>
				<view class="item">
					<view class="left"><text class="iconfont icon-a-73-tuichu"></text><text class="text">退出登录</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	const db = uniCloud.database()
	export default {
		data() {
			return {
				totalObj: {
					artNum: 0,
					likeNum: 0
				}
			};
		},
		computed: {
			userInfo() {
				return store.userInfo
			},
			hasLogin() {
				return store.hasLogin
			}
		},
		onLoad() {


		},
		methods: {
			// 跳转到个人资料
			toUserInfo() {
				if (!this.hasLogin) {
					uni.showToast({
						title: "未登录",
						icon: "none"
					})
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
					})
					// #endif
					uni.navigateTo({
						url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
					})
					return
				}
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
				})
			},
			// 跳转到我的长文
			toMyArticle() {
				if (!this.hasLogin) {
					uni.showToast({
						title: "未登录",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/blog_article/list"
				})
			},
			// 跳转到我的点赞
			toMyLike() {
				if (!this.hasLogin) {
					uni.showToast({
						title: "未登录",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: "/pages/blog_like/list"
				})
			},
			goFeedBack() {
				if (!this.hasLogin) {
					uni.showToast({
						title: "未登录",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url: "/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback"
				})
			},
			// 退出登录
			logout() {
				if (!this.hasLogin) {
					uni.showToast({
						title: "未登录",
						icon: "none"
					})
					return
				}
				uni.showModal({
					title: "是否退出登录?",
					success: res => {
						if (res.confirm) mutations.logout()
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: $bgc-grey-1;
	}
	.user-box {
	
		.top-box {
			// 避开小程序胶囊按钮
			// padding-top: var(--status-bar-height);
			box-sizing: border-box; //怪异盒子 border 与padding 会被计算在整体宽度内
			height: 350rpx;
			width: 95vw;
			margin: 0 auto;
			background: $bgc-grey-2;
			padding: 0 30rpx;
			position: relative;
			display: flex;
			align-items: center;
			.group {
				z-index: 10;
				color: #fff;

				.userinfo {
					display: flex;
					align-items: center;

					.avatar-box {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						overflow: hidden;
						border: 2px solid #fff;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.text {
						padding-left: 20rpx;

						.nickname {
							font-size: 44rpx;
							font-weight: 600;
						}

						.year {
							font-size: 26rpx;
							opacity: 0.6;
							padding-top: 5rpx;
						}
					}
				}

			}
			// 背景图
			.bg {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					filter: blur(20px); //高斯模糊
					transform: scale(2);
					opacity: 0.5;
				}
			}
		}

		.main {
			width: 90vw;
			margin: 0 auto;
			background: #fff;
			border-radius: 30rpx;
			transform: translateY(-80rpx);
			.list {
				padding: 15rpx 30rpx;
				.item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 25rpx 0;
					font-size: 36rpx;
					color: #555;
				}

			}
		}

	}
</style>