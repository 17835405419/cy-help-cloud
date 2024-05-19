<template>
	<view class="detail-box">
		<view class="swiper-box">
			<u-swiper class="swiper" :list="goodsInfo.goods_banner_imgs" height="230"></u-swiper>
		</view>
		<view class="middle-box">
			<view class="left">
				<text class="title">{{goodsInfo.good_name}}</text>
				<view class="time">
					发布于：{{$u.timeFormat(goodsInfo.add_date,'yyyy-mm-dd')}}
				</view>
			</view>
			<view class="right">
				<view class="tag-box">
					<u-tag class="tag" :text="goodsInfo.style === 0 ?'出售' :'求购'"
						:type="goodsInfo.style === 0 ? 'success' : 'warning'" size="mini"></u-tag>
				</view>
				<view class="price-box">
					<text class="price">¥ {{goodsInfo.price}}</text>
					<text class="iconfont icon-wenhao" @click="isShowTool = !isShowTool"></text>
					<view class="tool" v-show="isShowTool"> 该价格为卖家意向价格，实际价格可与卖家联系。</view>
				</view>
			</view>
		</view>
		<view class="content-box">
			<u-tabs class="tabs" :list="list" bar-width='80' :is-scroll="false" :current="current" @change="change" />
			<view class="detail" v-if="current == 0">
				<view class="content">
					<text>{{goodsInfo.goods_desc}}</text>
				</view>

				<view class="notes-box">
					<view class="notes-title">
						<text class="line">|</text>
						<text>商品备注</text>
					</view>
					<view class="notes-content ">
						<text>{{goodsInfo.seller_note || "暂无备注"}}</text>
					</view>
				</view>
			</view>


			<view class="author-info" v-else>
				作者详情
			</view>

		</view>

		<view class="bottom-box">
			<view class="share">
				<text class="iconfont icon-fenxiang"></text>
			</view>
			<view class="botton-box">
				<u-button type="warning" :text="goodsInfo.style === 0 ?'我也卖' : '我也发' " shape="circle" @click="gotoPublish"></u-button>
				<u-button type="success" :text="goodsInfo.style === 0 ?'我想要' : '我出售'" shape="circle" @click="gotoOrder"></u-button>
			</view>
		</view>


	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				goodsInfo: {},
				list: [{
						name: '商品详情'
					},
					{
						name: '作者详情'

					}
				],
				isShowTool: false,
				current: 0, //选中的tabs导航栏

			};
		},
		onLoad(e) {

			this.getData(e.id)
		},
		methods: {
			getData(id) {
				// 调用接口
				uni.showLoading({
					title: "正在加载中..."
				})
				db.collection("cy_goods").where({
					_id: id
				}).get({
					getOne: true
				}).then(res => {
					let {
						result
					} = res
					this.goodsInfo = result.data
				}).finally(fin => {
					uni.hideLoading()
				})
			},
			change(e) {
				const {
					index
				} = e
				this.current = index;
			},
			gotoOrder() {
				uni.navigateTo({
					url: "/pages/order/order?orderInfo=" + JSON.stringify(this.goodsInfo),
				})
			},
			gotoPublish(){
				if(this.goodsInfo.style === 0 ){
					return uni.navigateTo({
						url:"/pages/idle_publish/idle_publish"
					})
				}else{
					return uni.navigateTo({
						url:"/pages/want_buy/want_buy"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-box {
		// height: calc(100vh - var(--window-top));

	}

	.middle-box {
		padding: 50rpx 20rpx 0 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 14px;

		.left {
			.time {
				padding-top: 30rpx;
				font-size: 12px;
				color: $font-grey1;
			}
		}

		.right {
			.tag-box {
				display: flex;
				padding-bottom: 5rpx;
			}

			.price-box {
				position: relative;
				font-size: 13px;
				color: $font-purple;
				display: flex;
				align-items: center;
				padding: 20rpx 0 0 0;

				.price {
					color: $font-red;
					padding-right: 5rpx;
				}

				// 提示框
				.tool {
					position: absolute;
					bottom: 35rpx;
					right: 20rpx;
					width: 230rpx;
					height: 100rpx;
					background: rgba(0, 0, 0, .6);
					color: $font-white;
					font-size: 12px;
					border-radius: 15rpx;
					text-indent: 1em;
				}
			}

		}

	}

	/deep/.u-tabs__wrapper__nav__item__text {
		font-size: 13px;
	}

	.content-box {
		.tabs {
			font-size: 13px !important;
		}

		.detail {
			.content {
				padding: 20rpx;
				text-indent: 1em;
				font-size: 12px;
				line-height: 40rpx;
				min-height: 260rpx;
			}

			.notes-box {
				.notes-title {
					padding: 8rpx 0 8rpx 15rpx;
					width: 150rpx;
					font-size: 13px;
					border: 1px solid #eee;
					border-radius: 0 50rpx 50rpx 0;
					background-color: rgba(75, 170, 255, .5);

					.line {
						padding-right: 6rpx;
					}
				}

				.notes-content {
					padding: 20rpx;
					width: 95vw;
					text-indent: 1em;
					font-size: 12px;
					line-height: 40rpx;
				}
			}

		}
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		border-top: 1px solid #eee;
		padding: 0 20rpx;
		background-color: $bgc-white;

		.share {
			.iconfont {
				font-size: 18px;
			}
		}

		.botton-box {
			display: flex;
			width: 50vw;

			/deep/.u-button {
				margin: 0 5rpx;
			}
		}
	}
</style>