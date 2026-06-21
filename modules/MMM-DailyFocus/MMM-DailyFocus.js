Module.register("MMM-DailyFocus", {
	defaults: {
		refreshInterval: 5 * 60 * 1000,
		title: "TODAY'S FOCUS",
		maxTasks: 7
	},

	start () {
		this.tasks = [];
		this.date = "";
		this.loaded = false;
		this.sendSocketNotification("LOAD_TASKS");
		this.scheduleRefresh();
	},

	scheduleRefresh () {
		setInterval(() => {
			this.sendSocketNotification("LOAD_TASKS");
		}, this.config.refreshInterval);
	},

	socketNotificationReceived (notification, payload) {
		if (notification === "TASKS_LOADED") {
			this.tasks = (payload.tasks || []).slice(0, this.config.maxTasks);
			this.date = payload.date || "";
			this.loaded = true;
			this.updateDom(400);
		}
	},

	getDom () {
		const wrapper = document.createElement("div");
		wrapper.className = "mmm-daily-focus";

		const header = document.createElement("div");
		header.className = "focus-header";
		header.innerText = this.config.title;
		wrapper.appendChild(header);

		if (!this.loaded) {
			const loading = document.createElement("div");
			loading.className = "focus-loading";
			loading.innerText = "Loading...";
			wrapper.appendChild(loading);
			return wrapper;
		}

		if (this.tasks.length === 0) {
			const empty = document.createElement("div");
			empty.className = "focus-empty";
			empty.innerText = "No tasks for today.";
			wrapper.appendChild(empty);
			return wrapper;
		}

		const list = document.createElement("ul");
		list.className = "focus-list";

		this.tasks.forEach((task, index) => {
			const item = document.createElement("li");
			item.className = "focus-item" + (task.done ? " done" : "");

			const icon = document.createElement("span");
			icon.className = "focus-icon";
			icon.innerText = task.done ? "✓" : "○";

			const text = document.createElement("span");
			text.className = "focus-text";
			text.innerText = task.text;

			item.appendChild(icon);
			item.appendChild(text);

			item.addEventListener("click", () => {
				this.sendSocketNotification("TOGGLE_TASK", { index });
			});

			list.appendChild(item);
		});

		wrapper.appendChild(list);

		const doneCount = this.tasks.filter((t) => t.done).length;
		const progress = document.createElement("div");
		progress.className = "focus-progress";
		progress.innerText = `${doneCount} of ${this.tasks.length} done`;
		wrapper.appendChild(progress);

		return wrapper;
	}
});
