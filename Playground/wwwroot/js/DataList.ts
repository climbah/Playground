// import {makeAjaxCall, mapTemplate} from "./GlobalFunctions";

export class DataList {
    Root: HTMLDivElement;
    // Input
    Input: HTMLInputElement;
    // Span Buttons
    deleteButton: HTMLSpanElement;
    listButton: HTMLSpanElement;
    loadButtons: HTMLSpanElement;
    // Data
    htmlData: HTMLDataListElement;
    data: Array<number> = [1, 2, 3, 4]
    dataTemplate: string = '<li class="item">{{value}}</li>'
    // Api Communication
    searching: boolean = false;
 
    constructor(obj: HTMLDivElement) {
        this.Root = obj;// root element
        // html Input Element
        this.Input = obj.querySelector(".search-input") as HTMLInputElement;
        this.InputKeyup = this.InputKeyup.bind(this);
        this.Input.addEventListener('keyup', this.InputKeyup)
        this.Input.addEventListener('focusout', this.FocusOut)
        // html delete text button
        this.deleteButton = obj.querySelector(".delete-text") as HTMLSpanElement;
        this.deleteInputCH = this.deleteInputCH.bind(this);
        this.deleteButton.addEventListener('click', this.deleteInputCH);

        // html list button
        this.listButton = obj.querySelector(".list-indicator") as HTMLSpanElement;
        this.loadButtons = obj.querySelector(".search-indicator") as HTMLSpanElement;

        // Datalist datas in html
        this.htmlData = obj.querySelector(".search-result-data") as HTMLDataListElement;
        this.DataClick = this.DataClick.bind(this);
        this.htmlData.addEventListener('click', this.DataClick)

        this.generalCH = this.generalCH.bind(this);
        this.Root.addEventListener('click', this.generalCH);

        this.dataListInit();
        // this.searchInput = obj.querySelector(".search-input");

    }

    // General Click handler
    generalCH(e: Event) {
        this.Root.classList.toggle("result-open")
        this.filterList();
        console.log(e)
    }

    // Delete Text Click handler
    deleteInputCH(e: Event) {
        this.Input.value = "";
        this.Root.classList.add("result-open")
        e.stopPropagation();
    }

    async InputKeyup(e: KeyboardEvent) {
        // If Enter Key hit contact API
        if (e.keyCode === 13 && !this.searching) {
            if (this.Input.value.length < 3) return;
            this.searching = true;
            await this.loadResult()
            // await this.sleep(2000)
            this.filterList()
            this.searching = false;
        }
    }

    DataClick(e: Event) {
        var target = e.target as HTMLUListElement
        this.Input.value = target.innerText;
        this.Root.classList.remove("result-open")
        e.stopPropagation()
    }

// Data List Functions
    // Filter the Datalist
    filterList() {
        console.log('filter list')
    }

    dataListInit() {
        this.htmlData.innerHTML = '';
        for (let i = 0; i < this.data.length; i++) {  //How to properly iterate here!!
            var template = mapTemplate(this.dataTemplate, {value: this.data[i].toString()})
            this.htmlData.innerHTML += template;
        }
    }

    loadResult() {
        this.Root.classList.add("loading")
        console.log("load results from api");
        makeAjaxCall('https://localhost:5001/api/Note/GetNotes', 'GET')
            .then(response => {
                console.log('Success:', response)
                this.Root.classList.remove("loading")
            })
            .catch(error => {
                console.error('Error:', error)
                this.Root.classList.remove("loading")
            });
    }

    private FocusOut() {
        this.Root.classList.remove("result-open")
    }
}
