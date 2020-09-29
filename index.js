// -------------------------------------change css style
$(document).ready(function () {
    $(".bigText").click(function () {
        $("html").css({ "font-size": "larger" });
    });
});

$(document).ready(function () {
    $(".SmallText").click(function () {
        $("html").css({ "font-size": "small" });
    });
});


$(document).ready(function () {
    $(".changeColorOfBackgroundToBlack").click(function () {
        $(".cardCss").css({ "background-color": "black", "color": "white" });
        $(".headerPage").css({ "background-color": "black", "color": "white" });
        $(".About").css({ "background-color": "black", "color": "white" });
        $(".liveReports").css({ "background-color": "black", "color": "white" });
        $(".btnCss ").css({ "background-color": "#97ff2c", "color": "black" });
    });
});

$(document).ready(function () {
    $(".changeCssToNormal").click(function () {
        $(".cardCss").css({ "background-color": "", "color": "" });
        $(".headerPage").css({ "background-color": "", "color": "" });
        $(".About").css({ "background-color": "", "color": "" });
        $(".liveReports").css({ "background-color": "", "color": "" });
        $(".btnCss ").css({ "background-color": "", "color": "" });
        $("html").css({ "font-size": "" });
    });
});

// -------------------------------------sticky header

window.onscroll = function () { myFunction() };

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

// -------------------------------------spinner

const spinner = document.getElementById("spinner");

function showSpinner() {
    spinner.className = "showSpinner";
    setTimeout(() => {
        spinner.className = spinner.className.replace("showSpinner", '');
    }, 1000);
}

function hideSpinner() {
    spinner.className = spinner.className.replace("showSpinner", '');
}

// -------------------------------------print coins - url
function coinsInfo() {
    showSpinner()
    $(function () {
        jQuery.ajax({
            type: "get",
            url: 'https://api.coingecko.com/api/v3/coins/list',
            dataType: "json",
            success: function (data) {
                hideSpinner()
                console.log(data)
                let searchCoinsString = coinstCardString(data);
                $("#container").html(searchCoinsString);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert('Error');
            }
        });
    });
};

// -------------------------------------print coins
function coinstCardString(data) {
    let tackCoins = '';
    for (let i = 0; i < 51; i++) {
        let checkboxCoins = `${data[i].id}`
        tackCoins += `<div class ="cardCss" div id=${data[i].id}>
                    <label class="switch">
                    <input type="checkbox" id='${data[i].id}' name="test">
                    <span class="slider round"></span>
                    </label>
                    <div class = "textInnetBox">
                        <h2><span style = 'color: #3390ff'>${data[i].symbol}</span></h2>
                        <ul>${data[i].id}</ul>
                        <p></p>
                        <button class="btnCss" type="button" onclick="moreInfo('${data[i].id}')"
                        data-toggle="collapse" data-target="#infoCard${data[i].id}">More Info</button>
                        <p>
                        <div id ="infoCard${data[i].id}">
                        </div>
                        </div>
                        </div>`;

        // -------------------------------------arr - 5 coins
        var arrOfCoins = [];
        $(document).ready(function () {
            $(`input[id='${data[i].id}']`).change(function (e) {
                let id = 0;
                let coinsChecked = e.currentTarget.id
                if (e.currentTarget.checked) {
                    coinsChecked = arrOfCoins.push(coinsChecked);
                }
                else {
                    arrOfCoins.splice(arrOfCoins.indexOf(id), 1);
                }
                console.log(arrOfCoins)
                let maxCoins = 5;
                let coinsNum = $(`input[id=coinsChecked]:checked`).length;
                console.log('coinsChecked ' + coinsChecked)

                if (arrOfCoins.length >= maxCoins) {
                    //$(this).prop("checked", "");
                    // console.log('arr: ' + arrOfCoins)


                    document.getElementById("NewContainerAfter5Coins").innerHTML =
                        `<div class='boxAfterChoiceFiveCoins'>
                                    <span style="color:white;font-weight:bold; font-size: 30px">Your 5 coins</span>
                                    <br><button class ="delete">Close</button>
                                <div class='innher'>
                                    <ul>First coin: ${arrOfCoins[0]} <input type="checkbox" id="${arrOfCoins[0]}" class="popchk" checked${arrOfCoins[0]}</input checked></ul>
                                    <ul>Second coin: ${arrOfCoins[1]} <input type="checkbox" id="${arrOfCoins[1]}" class="popchk" checked${arrOfCoins[1]}</input checked></ul>
                                    <ul>Thid coins: ${arrOfCoins[2]} <input type="checkbox" id="${arrOfCoins[2]}" class="popchk" checked${arrOfCoins[2]}</input checked></ul>
                                    <ul>Fourth coin: ${arrOfCoins[3]} <input type="checkbox" id="${arrOfCoins[3]}" class="popchk" checked${arrOfCoins[3]}</input checked></ul>
                                    <ul>Fifth coin: ${arrOfCoins[4]} <input type="checkbox" id="${arrOfCoins[4]}" class="popchk" checked${arrOfCoins[4]}</input checked></ul>
                                </div>
                                </div>`
                }


                for (i = 0; i < arrOfCoins.length; i++) {
                    let removeItemTest = $(`input[id='${arrOfCoins[i]}']:checked.popchk`).change(function (e) {
                        if (!this.checked) {
                            let id = e.currentTarget.id;
                            arrOfCoins.splice(arrOfCoins.indexOf(id), 1);
                            $('*[id*="' + id + '"]:checked').each(function () {
                                $(this).checked = false;
                                console.log('arr: ' + arrOfCoins)
                            });

                            $(".boxAfterChoiceFiveCoins").css("display", "none");
                        }
                    });
                }


                $(".delete").click(function () {
                    $(".boxAfterChoiceFiveCoins").css("display", "none"); //delete box
                    // coinsInfo() // load coins - first funtion
                    // arrOfCoins = [];

                });


            });
        });


    };
    return tackCoins;
};

// -------------------------------------get data from utl
function moreInfo(id) {
    showSpinner()
    $.ajax({
        type: "GET",
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        success: function (response) {
            hideSpinner()
            displayInfo(response);
        }, error: function () {
            alert("Cannot display additional information")
        }
    })
}

// -------------------------------------show more info
function displayInfo(data) {
    console.log(data.name)
    let image = $(`<ul></span><img src="${data.image.small}"</span></ul>`);
    let coinsPrices = $(`<ul><span style = 'color: #3390ff'>USD:</span>${data.market_data.current_price.usd}$<br>
                            <span style = 'color: #3390ff'>EUR:</span>${data.market_data.current_price.eur}€<br>
                            <span style = 'color: #3390ff'>ILS:</span>${data.market_data.current_price.ils}₪<ul>
                            `)
    let lengthOfMoreInfo = $(`#infoCard${data.id}`).html(image).length
    let lengthOfMoreInfoMore = $(`#infoCard${data.id}`).append(coinsPrices).length
    console.log(lengthOfMoreInfo)
}

// -------------------------------------search coins
async function search() {
    showSpinner()
    $("#container").html("");
    let input = document.getElementById('name').value
    let response = await fetch(`https://api.coingecko.com/api/v3/coins/${input}`)
    let coin = await response.json();
    if (coin.id === undefined) {
        alert("The coin: '" + input + "' not found. please try again")
        coinsInfo()
    }
    drawCoins(coin)
    hideSpinner()
}

// -------------------------------------search coins and print
function drawCoins(coin) {
    $('#container').show()
    let element = $(`<div class="cardCssMore"=${coin.name}</div>`)
    element.append(`<label class="switch">
                            <input type="checkbox">
                            <span class="slider round"></span>
                            </label>
                            <div class = "textInnetBox">
                                <h2><span style = 'color: #3390ff'>${coin.symbol}</span></h2>
                                <ul><span style = 'color: #3390ff'>Id:</span>${coin.id}</ul>
                                <div id="accordion">
                                    <button class="btnCss">More Info</button>
                                    <div>
                                    <ul class="searchCss"><img src="${coin.image.small}">
                                    <p></p>
                                    <p><span style = 'color: #3390ff'>USD:</span>${coin.market_data.current_price.usd}$<br>
                                    <span style = 'color: #3390ff'>EUR:</span>${coin.market_data.current_price.eur}€<br>
                                    <span style = 'color: #3390ff'>ILS:</span>${coin.market_data.current_price.ils}₪<ul>
                                    </div>
                                    </div>`)
    $('#container').append(element)

    $(function () { //collapsible
        $("#accordion").accordion({
            collapsible: true
        });
    });
};

