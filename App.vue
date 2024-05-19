<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	// #ifndef MP-WEIXIN
	@import url("//at.alicdn.com/t/c/font_4075854_robwcdc129.css"); //导入临时字体图标
	// #endif

</style>
