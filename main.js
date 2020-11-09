let serialJSON = {};
let mode;

function successful(mode) {

    serialJSON['mode'] = mode;

    console.log(serialJSON);

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbx9uLamD9tPy09i7rIvqcafj5rLdUmV4l_7c_HSOREe7zR204-k/exec",
        type: 'POST',
        data: serialJSON,

        success: function (res) {
            if (res.Returned === 'Verified') {
                //document.getElementById('status').innerHTML = "You have logged in";
                window.location.replace('page_2.html');
            }
            else if (res.Returned === 'Wrong credentials') {
                document.getElementById("status").innerHTML = "Wrong credentials";
            }
            else if (res.Returned === 'wrong') {
                console.log('wrong answer');
            }
            else {
                console.log('correct answer');
            }
        },
        error: function (res) {
            console.log('error');
        }
    });
}
