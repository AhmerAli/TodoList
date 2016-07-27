/// <reference path="jquery.d.ts"/>
let index:number = -1; //strong typing
let mytasks:any;
let editmode:boolean = false;
$( document ).ready(function() {
    mytasks = localStorage.getItem("mytasks");
    mytasks = JSON.parse(mytasks);
    if(mytasks == null) {
        mytasks = [];   
    }
    createList();
    // $(".ah-row2 ul li span").bind("click", function(){ 
    //     var str = $('.ah-row2 ul li').index();
    // alert(str);
    // // });
    // $(".ah-row2 ul li input").on("click", "li", function() {
    //     alert($(this).index());
    // });
    let txtBox = $("#txtName");
    txtBox.keyup(function(e){
        if(e.keyCode == 13){
            // alert("Enter Key is Pressed!"); 
            if (txtBox.val().length == 0) {
               alert("Please Enter Task to continue!");
            }
            if(editmode == false) {
                add();
                createList();
                txtBox.val('');
            }
            else if (editmode == true){

            }
        }
    });
    
    //Edit Function
    $(document).on('click', '.ah-edit input', function () {
        index = parseInt($(this).attr("data-task"));
        // alert(index);
        let task = JSON.parse(mytasks[index]);
        $("#txtName").val(task.Name);
        $("#txtName").focus();
        editmode = true;
        $("#ah-content-txttaskname input:eq(1)").css({"opacity":"1","pointer-events":"auto","cursor":"pointer"});
    });
    
    //Delete Function
    $(document).on('click', '.ah-delete input', function () {
        index = parseInt($(this).attr("data-task"));
        // alert(index);
        deleted();
        createList();
        txtBox.val('');
        editmode = false;
        $("#ah-content-txttaskname input:eq(1)").css({"opacity":"0.4","pointer-events":"none","cursor":"default"});
    });
    
    //Save Function
    $(document).on('click', '#ah-content-txttaskname input:eq(1)', function () {
        save();
        createList();
        txtBox.val('');
        editmode = false;
        $("#ah-content-txttaskname input:eq(1)").css({"opacity":"0.4","pointer-events":"none","cursor":"default"});
    });
});

function createList() {
    $(".ah-row2 #ah-row-tasks-list").empty();   
    for (let i in mytasks){
        let tasks = JSON.parse(mytasks[i]);
        $(".ah-row2 #ah-row-tasks-list").append("<li>"+ 
                                        tasks.Name + 
                                        "<span class='ah-edit'>" +
                                        "<input type='image' src='Imgs/edit.png' width='16px' height='16px' data-task='"+i+"' />" +
                                        "</span>" +
                                        "<span class='ah-delete'>" +
                                        "<input type='image' src='Imgs/garbage.png' width='16px' height='16px' data-Task='"+i+"' />" +
                                        "</span>" +
                                        "</li>"
        );
    }
}
//CRUD Operations
function add():boolean{
    let tasks = JSON.stringify({
        Name: (<HTMLInputElement>document.getElementById("txtName")).value
    });
    mytasks.push(tasks); 
    localStorage.setItem("mytasks", JSON.stringify(mytasks)); 
    return true;
}

function save():boolean {
    mytasks[index] = JSON.stringify({
        Name: (<HTMLInputElement>document.getElementById("txtName")).value
    });
    localStorage.setItem("mytasks", JSON.stringify(mytasks));
    return true;
}
function deleted() {
    mytasks.splice(index, 1);
    localStorage.setItem("mytasks", JSON.stringify(mytasks));
}