<template>
	<view class="idel-box">
		<view class="top-box">
			<text @click="empty">清空</text>
			<view class="botton-box">
				<button type="default" size='mini'>暂存</button>
				<button type="default" size='mini' class="publish" :class="publishBottonDisableShow ? '' : 'active' "
					:disabled="publishBottonDisableShow" @click="pubilsh">发布</button>
			</view>
		</view>
		<view class="middle-box">

			<u--textarea class="textarea" :autoHeight="true" v-model="shopInfo.goods_desc"
				placeholder="请输入求购商品详情"></u--textarea>

			<!-- 图片上传组件 -->
			<u-upload :fileList="shopInfo.goods_banner_imgs" previewFullImage multiple @afterRead="afterRead"
				@delete="deletePic">
				<view class="upload-img" maxCount="5">
					<text>
						+ 添加图片可以更好的让其他人了解你的需求
					</text>
				</view>
			</u-upload>
		</view>
		<view class="bottom-box">
			<view class="item">
				<view class="left  must">
					<text class="iconfont icon-shangpinguanli "></text>
					<text>物品名</text>
				</view>
				<input type="text" v-model="shopInfo.good_name" placeholder="请输入物品名" maxlength="20">
			</view>
			<view class="item">
				<view class="left  must">
					<text class="iconfont icon-jiage"></text>
					<text>意向价格</text>
				</view>
				<input type="number" v-model.number="shopInfo.price" placeholder="¥0.00" maxlength="9">
			</view>
			<view class="item">
				<view class="left ">
					<text class="iconfont icon-guanjianci"></text>
					<text>关键词</text>
				</view>
				<input type="text" v-model="shopInfo.keywords" placeholder="非必填" maxlength="20">
			</view>
			<view class="item">
				<view class="left">
					<text class="iconfont icon-beizhu"></text>
					<text>备注</text>
				</view>
				<input type="text" v-model="shopInfo.seller_note" placeholder="非必填">
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				shopInfo: {
					good_name: "",
					price: null,
					keywords: "",
					goods_desc: "",
					goods_banner_imgs: [

					],
					goods_thumb: "", //商品缩略图
					seller_note: "", //商家备注
					style:1
				},
				publishBottonDisableShow: true,

			};
		},
		computed: {
			// 同时监听某对象中两个属性 需要搭配计算属性使用
			retrunWatch() {
				const {
					good_name,
					price
				} = this.shopInfo
				return {
					good_name,
					price
				}
			}
		},

		watch: {
			retrunWatch: {
				handler(news, olds) {
					if (news.good_name != "" && news.price != null) {
						this.publishBottonDisableShow = false
					} else {
						this.publishBottonDisableShow = true
					}

				},
				deep: true
			}
		},
		methods: {
			deletePic(event) {
				this.shopInfo.goods_banner_imgs.splice(event.index, 1)
			},
			async afterRead(e) {
				let {
					file
				} = e
				for (let item of file) {
					let res = await uniCloud.uploadFile({
						filePath: item.url,
						cloudPath: item.name
					})
					this.shopInfo.goods_banner_imgs.push({
						"url": res.fileID
					})

				}
			},
			// 清空按钮
			empty() {
				this.shopInfo = {
					good_name: "",
					price: null,
					keywords: "",
					goods_desc: "",
					goods_banner_imgs: [

					],
					goods_thumb: "", //商品缩略图
					seller_note: "", //商家备注
					style:0
				}
			},
			pubilsh() {
				uni.showLoading({
					title: "发布中...",
				})
				// 如果有图片则添加缩略图
				if (this.shopInfo.goods_banner_imgs.length > 0) this.shopInfo.goods_thumb = this.shopInfo
					.goods_banner_imgs[0].url

				db.collection("cy_goods").add({
					...this.shopInfo
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: "发布成功"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
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
		},
	}
</script>

<style lang="scss" scoped>
	.idel-box {
		box-sizing: border-box;
	}

	.top-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 20rpx;
		color: $font-black;

		text {
			padding-left: 40rpx;
		}

		.botton-box {
			button {
				border-radius: 28rpx;
				border: 1rpx solid #eee;
				color: $font-grey1;

				&::after {
					border: none;
				}
			}

			.publish {
				margin: 0 20rpx;
				background-color: $bgc-yellow;

				&.active {
					background-color: $bgc-yellow2;
				}
			}
		}
	}

	.middle-box {
		margin: 25rpx;

		.textarea {
			border: none;
			min-height: 200rpx;

		}

		.upload-img {
			width: 160rpx;
			height: 160rpx;
			border: 1px solid #eee;
			font-size: 12px;
			color: $font-grey1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: $bgc-grey-1;
			border-radius: 30rpx;

			text {
				padding: 10rpx;
			}
		}
	}

	.bottom-box {
		border-top: 1px solid #eee;

		.item {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			padding: 20rpx 0 20rpx 40rpx;

			.left {
				.iconfont {
					padding-right: 10rpx;
				}

				&.must::before {
					content: "*";
					color: red;
					position: absolute;
					left: 25rpx;
				}
			}

			& input {
				font-size: 12px;
			}
		}
	}
</style>
