<script>
new Vue({
    el: '#vueArea',
    data: {
        liNew: {
            taskName: '',
            taskCat: '',
            taskDate: '',
            taskPrio: '',
            taskDone: false,
            taskEditable: false,
            taskDelete: false,
        },

        myArray: [],

        sortBy: 'name',
        sortDirection: 'asc',
    },

    methods: {
        pushTask() {
            this.myArray.push(Object.assign({}, this.liNew));
            const taskArrStorage = JSON.stringify(this.myArray);
            localStorage.setItem("taskArrStorage", taskArrStorage);
            console.log('Array Stored in Local')
        },

        editItem(item, index) {
            item.taskEditable = !item.taskEditable;
            const taskArrStorage = JSON.stringify(this.myArray);
            localStorage.setItem("taskArrStorage", taskArrStorage);
            console.log('Array Stored in Local')
        },

        strike(item) {
            item.taskDone = !item.taskDone;
            const taskArrStorage = JSON.stringify(this.myArray);
            localStorage.setItem("taskArrStorage", taskArrStorage);
            console.log('Array Stored in Local')
        },

        deleteItem(item, index) {
            this.myArray.splice(index, 1);
            const taskArrStorage = JSON.stringify(this.myArray);
            localStorage.setItem("taskArrStorage", taskArrStorage);
            console.log('Array Stored in Local')
        },

        sort: function (s) {
            if (s === this.sortBy) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            }
            this.sortBy = s;
        }
    },

    mounted: function (item) {
        let taskSaved = localStorage.getItem("taskArrStorage");
        let taskLoad = JSON.parse(taskSaved);
        if (taskLoad === null) {
            console.log('No objects in array')
        } else {
            this.myArray.push(...taskLoad);
        }
        let doneButton = document.getElementById("doneOutputID");
        if (item.taskDone === true) { doneButton.checked = true } else { doneButton.checked = false };
    },

    computed: {
        sortedItems: function () {
            return this.myArray.sort((p1, p2) => {
                let modifier = 1;
                if (this.sortDirection === 'desc') modifier = -1;
                if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier; if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
                return 0;
            });
        }
    },

})
</script>