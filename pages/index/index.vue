<template>
	<view class="index-box">

		<view class="defult-navBar"></view>

		<view class="narBar">
			<u-search class="input" :bgColor="bgColor" :placeholder="placeholder" shape="square" :showAction="false"
				v-model="searchContent"></u-search>
			<view class="iconfont icon-saoma">

			</view>

		</view>


		<view class="swiper-content">
			<u-swiper class="swiper" :list="swiperLists" previousMargin="30" nextMargin="30" height="160"
				:circular="true"  radius="5"></u-swiper>
		</view>
		<!-- 		<view class="covor-img">
			<image src="https://img.guguzhu.com/d/file/20200523/xianzhiwupinjiaoyi.jpg" mode="cover-img"></image>
		</view> -->
		<view class="scrollShop-box">
			<view class="scroll-text">
				热门推荐
			</view>
			<u-scroll-list>
				<view v-for="(item, index) in list" :key="index">
					<image :src="item.thumb"></image>
				</view>
			</u-scroll-list>
		</view>
		<view class="content-box">
			<view class="shop-text">
				最新发布 
			</view>
			<view class="shop-content">

				<!-- 商品列表 -->

				<goods-card v-for="(item,index) in goodsList" :goodsInfo="item" :key="index"  />

				<u-skeleton rows="3" title :loading="showSkeleton"></u-skeleton>
			</view>
		</view>
	</view>



</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				placeholder: "搜索一下吧~",
				searchContent: "",
				bgColor: "#fff",
				swiperLists: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
				list: [{
					thumb: "https://cdn.uviewui.com/uview/goods/1.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/2.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/3.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/4.jpg"
				}, {
					thumb: "https://cdn.uviewui.com/uview/goods/5.jpg"
				}],
				goodsList: [],
				showSkeleton:true,


			}
		},
		onLoad() {
			this.getShopData()
		},
		methods: {
			 getShopData() {
					db.collection("cy_goods").where("status == 0")
					.field("_id,good_name,price,goods_thumb,style")
					.orderBy("last_modify_date desc").limit(6).get().then(res=>{
						this.goodsList =res.result.data
						this.showSkeleton = false
					})
				
			}
		}
	}
</script>
<!-- #ifdef MP-WEIXIN -->
<!-- 加了scoped 因此在小程序中 设置page不生效 -->
<style>
	page {
		background-color: #f5f5f5;
	}
</style>
<!-- #endef  -->

<style lang="scss" scoped>
	page {
		background-color: $bgc-grey-1 ;
	}

	.index-box {

		// 该页面取消了原生导航栏 防止微信小程序中 内容占据状态栏位置
		.defult-navBar {
			height: var(--status-bar-height);

			// #ifdef MP-WEIXIN
			position: sticky;
			top: 0;
			z-index: 99;
			height: calc(var(--status-bar-height) + 70rpx);
			background-color: #fff;
			// #endif
		}

		.narBar {
			height: 100rpx;
			line-height: 100rpx;
			display: flex;
			background-color: $bgc-grey-2;
			// #ifndef MP-WEIXIN
			position: sticky;
			top: 0;
			z-index: 99;
			// #endif


			.input {
				padding-left: 30rpx;
			}

			.iconfont {
				font-size: 66rpx;
				color: $font-white;
			}
		}

		.swiper-content {
			background-color: $bgc-grey-2;

			.swiper {
				padding-top: 20rpx;
			}
		}

		.covor-img {
			box-sizing: border-box;
			width: 100%;
			height: 260rpx;
			margin-top: 20rpx;
			border: 3px solid #fff;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.scrollShop-box {
			margin-top: 20rpx;
			background-color: $bgc-white;

			.scroll-text {
				font-size: 13px;
				height: 70rpx;
				line-height: 70rpx;
				margin-left: 20rpx;
				font-weight: 800;
			}

			image {
				height: 200rpx;
				width: 200rpx;
				margin: 0 20rpx;
			}
		}

		.content-box {
			margin-top: 20rpx;
			border-radius: 15rpx;
			background-color: $bgc-white;

			.shop-text {
				font-size: 13px;
				height: 70rpx;
				line-height: 70rpx;
				margin-left: 20rpx;
				font-weight: 800;

			}

			.shop-content {
				display: flex;
				flex-wrap: wrap;
			}
		}
	}
</style>