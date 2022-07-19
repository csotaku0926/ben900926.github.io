var keys = ['a','s','d','f','h','j','k','l'];

// light up div when pressed the keyboard
window.addEventListener("keydown", (e) => {
    if(keys.includes(e.key))
    {
        let jl = document.getElementById("jl_" + e.key);
        let bt = document.getElementById("bt_" + e.key);
        
        // if not pressed yet
        if(!jl.classList.contains("judge_line_pressed"))
            jl.classList.add("judge_line_pressed");
        bt.style.color = 'white';
    }
});

// back off when release keyboard
window.addEventListener("keyup", (e) => {
    if(keys.includes(e.key))
    {
        let jl = document.getElementById("jl_" + e.key);
        let bt = document.getElementById("bt_" + e.key);
        
        // if pressed
        if(jl.classList.contains("judge_line_pressed"))
            jl.classList.remove("judge_line_pressed");
        bt.style.color = 'aquamarine';
    }
});

// note peroidically falls down
const speed = 1;
const stop_time = 200; 
const interval = 100;
var second = 0;
var id_num = 0;
var notes = document.getElementsByClassName("note");
var created_times = [];
//convert to array
notes = [...notes];

// time function
var timeID = window.setInterval(() => {
    second += 1*speed;

    // add notes every 10 sec
    var track_a = document.getElementById("track_a");
    var track_s = document.getElementById("track_s");
    if((second % 10 == 0) || (second % 15 == 0))
    {
        console.log("create new note");
        var newNote = document.createElement("div");
        newNote.classList.add("note");
        newNote.style.top = '0%';
        if(second % 10 == 0)
            track_a.appendChild(newNote);
        if(second % 15 == 0)
            track_s.appendChild(newNote);
        notes.push(newNote);
        created_times.push(second);
    }
    

    let i = 0;
    for (let note of notes)
    {
        let top_int = parseInt(note.style.top.substr(0,2));
        top_int = second - created_times[i];
        note.style.top = `${top_int}%` ;
        // reach judge line
        if(top_int >= 80)
        {
            notes[i].remove(); //remove this note
        }  
        i += 1;
    }

    // stop timer
    if(second >= stop_time)
    {
        window.clearInterval(timeID);
        console.log("timer stop!");
    }
        
}, interval);




