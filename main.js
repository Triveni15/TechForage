let serialJSON = {};
let mode, right = 0;

function successful(mode) {

    serialJSON['mode'] = mode;
    console.log(serialJSON);

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbx9uLamD9tPy09i7rIvqcafj5rLdUmV4l_7c_HSOREe7zR204-k/exec",
        type: 'POST',
        data: serialJSON,

        success: function (res) {
            if ('Verified' === res.Returned) {
                window.location.replace('page_2.html');
                //window.location.href = "page_2.html";
            }
            else if ('Wrong credentials' === res.Returned) {
                document.getElementById("status").innerHTML = "Wrong credentials";
            }
            else if (res.Returned == 'F') {
                // alert('Sorry, you have used all your attempts.');
                window.location.replace('fail.html');
                //window.location.href = "fail.html";
            }
            else if (res.Returned == 'T') {
                right++;
                if (right >= 2) {
                    window.location.replace('cleared.html');
                    //window.location.href = "cleared.html";
                }
                console.log('correct answer');
            }
            else if (res.Returned == 'E') {
                window.location.replace('index.html');
                console.log(res.Returned);
            }
            else {
                document.getElementById('attemptStatus').innerHTML = ` Number of attempts left ${res.Returned}.`;
            }
        },
        error: function (res) {
            console.log('error');
        }
    });
}
