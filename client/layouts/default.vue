 <template>
	<div id="app" style="margin: 100px 0">
		<div id="main-wrapper">
			<!-- Menu -->
			<div
				class="_menu"
				v-if="
					$route.path != '/login' &&
					$route.path != '/register' &&
					$route.name != 'forgot_password' &&
					$route.name != 'verify-account'
				"
			>
				<div class="_layout">
					<div class="_layout_row align-items-center">
						<div class="_layout_auto">
							<div class="_menu_left">
								<div class="_menu_logo">
									<NuxtLink to="/">
										<h3 class="_menu_logo_text">
											<span class="_menu_logo_symbol"
												>C</span
											>
											<span class="_menu_logo_text_main"
												>APPOINTMENT SYSTEM</span
											>
										</h3>
									</NuxtLink>
								</div>

								<!-- <p class="_menu_left_home"><i class="fas fa-home"></i> <i class="fal fa-house-day"></i></p> -->
							</div>
						</div>

						<!-- Mobile and Ipad Menu button -->
						<div class="_layout_col _only_sm_md _desk_hidden">
							<NuxtLink to="/mobileMenu"
								><button class="_2btn _btn_sm">
									Menu
								</button></NuxtLink
							>
						</div>
						<!-- Mobile and Ipad Menu button -->

						<div class="_layout_col _only_desktop">
							<div class="_menu_search">
								<div class="_menu_search_main">
									<div class="_menu_search_icon">
										<i class="fas fa-search"></i>
									</div>

									<div class="_menu_search_input">
										<input
											type="text"
											placeholder="Search"
										/>
									</div>
								</div>
							</div>
						</div>

						<div class="_layout_auto">
							<div class="_menu_right">
								<a
									@click="logout"
									href="javascript:void(0)"
									class="text-white"
									>Logout</a
								>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Menu -->

			<div class="_main_layout">
				<Nuxt />
			</div>

			<!-- Footer -->

			<!-- Feed spin -->

			<!-- Feed spin -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			moreDrop: false,
			clickMenu: false,
			isChatBox: false,
			isNotification: false,
			isFriendReq: false,
			noData: false,
			isMessage: false,
			isloaded: false,
			isHide: true,
			isHide2: true,
			tab: "",
			isMinimize: false,
			isMobileSearch: false,
		};
	},

	methods: {
		async logout() {
			//   this.logoutLoader = true
			const res = await this.callApi("get", `/auth/logout`);
			if (res.status == 200) {
				window.location = "/";
			}
			this.logoutLoader = false;
		},
		clickMenuDrop(tab) {
			if (
				tab != "messageDrop" &&
				tab != "notiDrop" &&
				tab != "friReqDrop"
			) {
				this.tab = "";
			}

			var self = this;
			var self2 = this;
			setTimeout(function () {
				self.$nextTick(function () {
					self.isloaded = !self.isloaded;
				});
				self2.$nextTick(function () {
					self2.isHide = !self2.isHide;
				});
			}, 1000);

			return (this.tab = tab);
		},
	},

	created() {},
};
</script>