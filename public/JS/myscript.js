var index = -1;
var mytasks;
var editmode = false;
$(document).ready(function () {
    mytasks = localStorage.getItem("mytasks");
    mytasks = JSON.parse(mytasks);
    if (mytasks == null) {
        mytasks = [];
    }
    createList();
    var txtBox = $("#txtName");
    txtBox.keyup(function (e) {
        if (e.keyCode == 13) {
            if (txtBox.val().length == 0) {
                alert("Please Enter Task to continue!");
            }
            if (editmode == false) {
                add();
                createList();
                txtBox.val('');
            }
            else if (editmode == true) {
            }
        }
    });
    $(document).on('click', '.ah-edit input', function () {
        index = parseInt($(this).attr("data-task"));
        var task = JSON.parse(mytasks[index]);
        $("#txtName").val(task.Name);
        $("#txtName").focus();
        editmode = true;
        $("#ah-content-txttaskname input:eq(1)").css({ "opacity": "1", "pointer-events": "auto", "cursor": "pointer" });
    });
    $(document).on('click', '.ah-delete input', function () {
        index = parseInt($(this).attr("data-task"));
        deleted();
        createList();
        txtBox.val('');
        editmode = false;
        $("#ah-content-txttaskname input:eq(1)").css({ "opacity": "0.4", "pointer-events": "none", "cursor": "default" });
    });
    $(document).on('click', '#ah-content-txttaskname input:eq(1)', function () {
        save();
        createList();
        txtBox.val('');
        editmode = false;
        $("#ah-content-txttaskname input:eq(1)").css({ "opacity": "0.4", "pointer-events": "none", "cursor": "default" });
    });
});
function createList() {
    $(".ah-row2 #ah-row-tasks-list").empty();
    for (var i in mytasks) {
        var tasks = JSON.parse(mytasks[i]);
        $(".ah-row2 #ah-row-tasks-list").append("<li>" +
            tasks.Name +
            "<span class='ah-edit'>" +
            "<input type='image' src='Imgs/edit.png' width='16px' height='16px' data-task='" + i + "' />" +
            "</span>" +
            "<span class='ah-delete'>" +
            "<input type='image' src='Imgs/garbage.png' width='16px' height='16px' data-Task='" + i + "' />" +
            "</span>" +
            "</li>");
    }
}
function add() {
    var tasks = JSON.stringify({
        Name: document.getElementById("txtName").value
    });
    mytasks.push(tasks);
    localStorage.setItem("mytasks", JSON.stringify(mytasks));
    return true;
}
function save() {
    mytasks[index] = JSON.stringify({
        Name: document.getElementById("txtName").value
    });
    localStorage.setItem("mytasks", JSON.stringify(mytasks));
    return true;
}
function deleted() {
    mytasks.splice(index, 1);
    localStorage.setItem("mytasks", JSON.stringify(mytasks));
}
//# sourceMappingURL=myscript.js.map