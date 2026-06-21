const NodeHelper = require("node_helper");
const fs = require("fs");
const path = require("path");

module.exports = NodeHelper.create({
	start () {
		this.tasksFile = path.join(__dirname, "tasks.json");
	},

	socketNotificationReceived (notification, payload) {
		if (notification === "LOAD_TASKS") {
			this.loadTasks();
		} else if (notification === "TOGGLE_TASK") {
			this.toggleTask(payload.index);
		}
	},

	loadTasks () {
		try {
			const raw = fs.readFileSync(this.tasksFile, "utf8");
			const data = JSON.parse(raw);
			this.sendSocketNotification("TASKS_LOADED", data);
		} catch (e) {
			this.sendSocketNotification("TASKS_LOADED", { date: "", tasks: [] });
		}
	},

	toggleTask (index) {
		try {
			const raw = fs.readFileSync(this.tasksFile, "utf8");
			const data = JSON.parse(raw);
			if (data.tasks[index] !== undefined) {
				data.tasks[index].done = !data.tasks[index].done;
				fs.writeFileSync(this.tasksFile, JSON.stringify(data, null, 2), "utf8");
			}
			this.sendSocketNotification("TASKS_LOADED", data);
		} catch (e) {
			this.loadTasks();
		}
	}
});
