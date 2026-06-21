/* Config Sample
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "0.0.0.0",
	port: 8080,
	basePath: "/",
	ipWhitelist: [],

	useHttps: false,
	httpsPrivateKey: "",
	httpsCertificate: "",

	language: "en",
	locale: "en-IN",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"],
	timeFormat: 12,
	units: "metric",

	modules: [
		{
			module: "alert"
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "top_left",
			config: {
				displayType: "digital",
				showWeek: true,
				showDate: true
			}
		},

		/* ===== YOUR CALENDAR ===== */
		{
			module: "calendar",
			header: "My Calendar",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/gawande.pankajkumar%40gmail.com/public/basic.ics"
					}
				],
				maximumEntries: 5,
				maximumNumberOfDays: 30
			}
		},

		/* ===== CUSTOM GREETING / COMPLIMENTS ===== */
		{
			module: "compliments",
			position: "lower_third",
			config: {
				compliments: {
					anytime: [
						"Have a strong day, Pankaj.",
						"Focus on what matters today.",
						"One solid step today is enough.",
						"Keep building. Keep shipping.",
						"You've got this."
					],
					morning: [
						"Good morning, Pankaj.",
						"Start calm. Finish strong."
					],
					afternoon: [
						"Keep the momentum going."
					],
					evening: [
						"Wrap up well and recharge."
					]
				}
			}
		},

		/* ===== WEATHER: INDORE ===== */
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				lat: "22.7196",
				lon: "75.8577",
				apiKey: "e73102fd202500471b8ce346de1009ab"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				lat: "22.7196",
				lon: "75.8577",
				apiKey: "e73102fd202500471b8ce346de1009ab"
			}
		},

		/* ===== TODAY'S FOCUS ===== */
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "Dainik Bhaskar",
						url: "https://www.bhaskar.com/rss-feed/1061/"
					}
				],
				showSourceTitle: false,
				showPublishDate: false,
				broadcastNewsFeeds: false,
				broadcastNewsUpdates: false
			}
		}
	]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") { module.exports = config; }
