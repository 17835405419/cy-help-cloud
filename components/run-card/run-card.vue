<template>
	<view class="run-box">
		<view class="left">
			<u-avatar :src="giveAvatar(taskInfo)" :size="avatarObj.size"></u-avatar>
		</view>
		<view class="right">
			<view class="right-top-box">
				<text class="run-title">
					{{taskInfo.category_id[0].name}}
				</text>
				<view class="status-tag">
					<u-tag :text="statusTagObj.text" :type="statusTagObj.type" size="mini"></u-tag>
				</view>
			</view>
			<view class="run-time">
				{{$u.timeFrom(taskInfo.add_date, false)}}
			</view>
			<view class="run-content">
				<text class="u-line-2">{{taskInfo.task_desc}}</text>
			</view>

			<view class="route-box">
				<view class="start">
					起：<text>{{taskInfo.start}}</text>
				</view>
				<view class="end">
					终：<text>{{taskInfo.end}}</text>
				</view>
			</view>

			<view class="price-tag">
				<u-tag :text="'金额'+ ' '+ taskInfo.price " borderColor="#ffb2b3" bgColor="#ffb2b3" size="mini" color='#ff0004'></u-tag>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		giveAvatar
	} from "@/utils/tools.js"
	import text from "../../uni_modules/uview-ui/libs/config/props/text"
	export default {
		name: "run-card",
		props: {
			taskInfo: {
				type: Object,
				default: () => {}
			}
		},
		computed: {
			statusTagObj() {
				let {
					status
				} = this.taskInfo
				if (status == 0) {
					return {
						text: "待完成",
						type: "warning"
					}
				} else if (status == 1) {
					return {
						text: "已接单",
						type: "error"
					}
				} else {
					return {
						text: "已完成",
						type: "info"
					}
				}
			}
		},
		data() {
			return {
				avatarObj: {
					src: "",
					size: "30",
				},

			};
		},
		methods: {
			// 外部导入的函数需要现在methods中定义一下
			giveAvatar,
		}
	}
</script>

<style lang="scss" scoped>
	.run-box {
		box-sizing: border-box;
		height: 300rpx;
		border: 1px solid #eee;
		display: flex;
		padding: 20rpx;
		margin: 20rpx;
		border-radius: 30rpx;
		box-shadow: 0 0 8px 1px #eee;
		background-color: rgba(170, 170, 255, .5);

		.right {
			font-size: 15px;
			padding-left: 20rpx;
			width: 80vw;
			position: relative;

			.right-top-box {
				display: flex;
				.run-title {
					font-weight: 600;

				}
				.status-tag {
					position: absolute;
					right: 0;
				}
			}

			.run-time {
				font-size: 12px;
				color: $font-grey1;
				margin-top: 4rpx;
			}

			.run-content {
				font-size: 14px;
				color: $font-black;
				margin-top: 10rpx;
				height: 95rpx;
			}

			.route-box {
				font-size: 12px;
				
				.start {
					margin-bottom: 6rpx;
					color:#7900b5;
				
				}
				.end{
						color: #5555ff;
				}
			}

			.price-tag {
				position: absolute;
				right: 0;
				bottom: 8rpx;
			}
		}
	}
</style>