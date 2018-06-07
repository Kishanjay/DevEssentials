/**
* @author Kishan Nirghin
* @date 01-10-2017
* @description some usefull javascript tips and tricks.
*/




/* =============================================================================
    Preserve variables in a callback function inside a loop
============================================================================= */
function problem(array){
    for (var i = 0; i < array.length; i++){

        asyncFunction(array[i], function(result){
            if (i == array.length-1){ /* i will not be the expected value */
                console.log("finished!");
            }
        });
    }
}

function solution(array){
    for (var i = 0; i < array.length; i++){

        /* creates new scope with i */
        (function(i){
            asyncFunction(array[i], function(result){
                if (i == array.length-1){
                    console.log("finished!");
                }
            });
        }(i);
    }
}
