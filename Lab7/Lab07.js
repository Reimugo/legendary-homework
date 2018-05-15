sOCreate();
function sOCreate() {
    const operateBox= document.getElementById("operateBox");
    operateBox.innerHTML= "";
    const tableNameBox= document.createElement("input");
    tableNameBox.setAttribute("type","text");
    tableNameBox.setAttribute("id", "tableName");
    tableNameBox.setAttribute("placeholder", "Table Name");
    const columnNumBox= document.createElement("input");
    columnNumBox.setAttribute("type", "number");
    columnNumBox.setAttribute("id", "columnNum");
    columnNumBox.setAttribute("placeholder", "Column Number");

    operateBox.appendChild(tableNameBox);
    operateBox.appendChild(columnNumBox);
    operateBox.appendChild(document.createElement("br"));
}

function cTCreate() {
    const operateBox= document.getElementById("operateBox");
    operateBox.innerHTML= "";
    const tableNameBox= document.createElement("input");
    tableNameBox.setAttribute("type","text");
    tableNameBox.setAttribute("id", "tableName");
    tableNameBox.setAttribute("placeholder", "Table Name");
    const columnNumBox= document.createElement("input");
    columnNumBox.setAttribute("type", "number");
    columnNumBox.setAttribute("id", "columnNum");
    columnNumBox.setAttribute("placeholder", "Column Number");
    // const commitBut= document.createElement("button");
    // commitBut.setAttribute("id", "cB1");
    // commitBut.setAttribute("class", "cB");
    // commitBut.appendChild(document.createTextNode("commit"));
    const arrBox= document.createElement("div");
    arrBox.setAttribute("id", "arrBox");
    const buttonBox= document.createElement("div");
    buttonBox.setAttribute("id", "buttonBox");

    operateBox.appendChild(tableNameBox);
    operateBox.appendChild(columnNumBox);
    // operateBox.appendChild(document.createElement("br"));
    // operateBox.appendChild(commitBut);
    operateBox.appendChild(document.createElement("br"));
    operateBox.appendChild(arrBox);
    operateBox.appendChild(buttonBox);

    cTCreateCopy();
}

function aRCreate() {
    const operateBox= document.getElementById("operateBox");
    operateBox.innerHTML= "";

    const index= document.getElementById("select2").selectedIndex;
    const table= dataTree._root.children[index];
    const arrNum= table.children.length;


    for (let i= 0; i< arrNum; i++) {

        const arrInput= document.createElement("input");
        arrInput.setAttribute("type", "text");
        arrInput.setAttribute("class", "arr");
        arrInput.setAttribute("placeholder", table.children[i].data);

        operateBox.appendChild(arrInput);
    }
    operateBox.appendChild(document.createElement("br"));

    const cB3= document.createElement("button");
    cB3.appendChild(document.createTextNode("commit"));
    cB3.setAttribute("onclick", "aRCommit()");

    operateBox.appendChild(cB3);

}

function dRCreate() {
    const operateBox= document.getElementById("operateBox");
    operateBox.innerHTML= "";

    const index= document.getElementById("select2").selectedIndex;
    const table= dataTree._root.children[index];
    const arrNum= table.children.length;

    for (let i= 0; i< arrNum; i++) {

        const arrInput= document.createElement("input");
        arrInput.setAttribute("type", "text");
        arrInput.setAttribute("class", "arr");
        arrInput.setAttribute("placeholder", table.children[i].data);

        operateBox.appendChild(arrInput);
    }
    operateBox.appendChild(document.createElement("br"));



    const cB4= document.createElement("button");
    cB4.appendChild(document.createTextNode("commit"));
    cB4.setAttribute("onclick", "dRCommit()");

    operateBox.appendChild(cB4);


}

function dTCreate() {
    const operateBox= document.getElementById("operateBox");
    operateBox.innerHTML= "";

    const select2= document.getElementById("select2");
    const index= select2.selectedIndex;
    if (index!== select2.options.length- 1) {
        const cB5= document.createElement("button");
        cB5.appendChild(document.createTextNode("commit"));
        cB5.setAttribute("onclick", "dTCommit()");

        operateBox.appendChild(cB5);
    }

}


function cTCreateCopy() {
    const columnNum = document.getElementById("columnNum");
    columnNum.onchange= function () {
        const column= columnNum.value;
        const arrBox= document.getElementById("arrBox");
        const buttonBox= document.getElementById("buttonBox");
        if (column> 0) {
            arrBox.innerHTML= "";
            buttonBox.innerHTML= "";

            for (let i= 0; i< column; i++) {

                const arrInput= document.createElement("input");
                arrInput.setAttribute("type", "text");
                arrInput.setAttribute("class", "arr");
                arrInput.setAttribute("placeholder", "Attribute");

                arrBox.appendChild(arrInput);
            }

            const commitBut= document.createElement("button");
            commitBut.setAttribute("id", "cB1");
            commitBut.setAttribute("class", "cB");
            commitBut.setAttribute("onclick", "cTCommit()");
            commitBut.appendChild(document.createTextNode("commit"));
            buttonBox.appendChild(commitBut);
        }
        else {
            buttonBox.innerHTML= "";
            arrBox.innerHTML= "";
        }
    };

}



function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree (data) {
    this._root = new Node(data);
}

const dataTree= new Tree("fatherNode");

function cTCommit() {
    const tableName= document.getElementById("tableName").value;
    const newTable= new Node(tableName);
    dataTree._root.children.push(newTable);
    newTable.parent= dataTree;

    const columnNum= document.getElementById("columnNum").value;
    const arrays= document.getElementsByClassName("arr");
    for (let i= 0; i< columnNum; i++) {
        const newArr= new Node(arrays[i].value);
        newTable.children.push(newArr);
        newArr.parent= newTable;
    }

    select2Refresh();

    const select2= document.getElementById("select2");
    const options= select2.options;
    options[options.length-2].selected= true;
    tableRefresh();
}

function aRCommit() {
    const arrays= document.getElementsByClassName("arr");
    const index= document.getElementById("select2").selectedIndex;
    const table= dataTree._root.children[index];

    for (let i= 0; i< arrays.length; i++) {
        const cellCont= new Node(arrays[i].value);
        cellCont.parent= table.children[i];
        table.children[i].children.push(cellCont);
    }
    tableRefresh();

}

function dRCommit() {
    const arrays= document.getElementsByClassName("arr");
    const index= document.getElementById("select2").selectedIndex;
    const table= dataTree._root.children[index];

    const deleteIndex= [];
    for (let r= 0; r< table.children[0].children.length; r++) {
        matchIndex(0, r);
    }


    function matchIndex(c, r) {
        if (c=== arrays.length) {
            deleteIndex.push(r);
        }
        else {
            if (table.children[c].children[r].data=== arrays[c].value.trim()|| arrays[c].value.trim()==="") {
                matchIndex(c+ 1, r);
            }
        }
    }

    if (deleteIndex.length!== 0) {
        for (let i= deleteIndex.length- 1; i>= 0; i--) {
            let r= deleteIndex[i];
            for (let j= 0; j< table.children.length; j++) {
                table.children[j].children.splice(r, 1);
            }
        }
    }


    tableRefresh();
}

function dTCommit() {
    const select2= document.getElementById("select2");
    const index= select2.selectedIndex;
    dataTree._root.children.splice(index, 1);
    select2Refresh();

    const options= document.getElementById("select2").options;
    options[0].selected= true;
    tableRefresh();
    alert("WARNING: You cannot undo this action!");

}




function select2Refresh() {
    const select2= document.getElementById("select2");
    select2.innerHTML= "";
    for (let i= 0; i< dataTree._root.children.length; i++) {
        const newOption= document.createElement("option");
        newOption.appendChild(document.createTextNode(dataTree._root.children[i].data));
        select2.add(newOption);
    }
    const newOption= document.createElement("option");
    newOption.appendChild(document.createTextNode("SELECT(default: last created)"));
    newOption.setAttribute("value", "default");
    select2.add(newOption);

}


function tableRefresh() {
    const index= document.getElementById("select2").selectedIndex;
    const tableBox= document.getElementById("tableBox");
    tableBox.innerHTML= "";

    const table= dataTree._root.children[index];
    const tr0= document.createElement("tr");

    for (let i= 0; i< table.children.length; i++) {
        let th= document.createElement("th");
        th.appendChild(document.createTextNode(table.children[i].data));
        tr0.appendChild(th);
    }
    tableBox.appendChild(tr0);


    for (let j= 0; j< table.children[0].children.length; j++) {
        let newRow= document.createElement("tr");
        for (let i= 0; i< table.children.length; i++) {
            let newCell= document.createElement("td");
            newCell.appendChild(document.createTextNode(table.children[i].children[j].data));
            newRow.appendChild(newCell);
        }
        tableBox.appendChild(newRow);
    }
}

function select1Change() {
    const select1= document.getElementById("select1");
    const href= select1.value;
    eval(href);
}

function select2Change() {
    tableRefresh();
    select1Change();
}