const data = {};
$(function () {
    if (data === {}) {
        console.log("search list")
    }

    $(".search")
        .on("click", ".delete-text", function (e) {
            $(this).parents(".input").find("input").val("");
            $(this).parents(".search").removeClass("result-open")
            e.preventDefault();
            return false;
        }).on("click", function (e) {
            if (!$(e.target).is("li.item")) {
                $(this).toggleClass("result-open")
                filterList($(e.target).text(), $(this))
                return;
            }
            var text = $(e.target).text();
            $("input").val(text);
            filterList(text, $(this))
        }).on("keyup", function (e, ev) {
        // searching value
        var val = $(this).find("input").val();
        // list to filter
        var list = $(this).parent().find("ul.data > li");

        // filter list
        console.log(val);
        console.log(list)
        filterList(val, $(this))
        //   var filterOptions = data[id].filter(
        //     d => val === "" || d.text.includes(val)
        //   );
        //   $(list).html(filterOptions
        //                .map(o => `<li id="${o.value}">${o.text}</li>`)
        //                .join(""));
    })

    function filterList(text, search) {
        $(search).addClass("loading")
        console.log("filter " + text);
        console.log($(search).find("li"))
        $(search).removeClass("loading")
    }

    function loadData() {

    }
});
