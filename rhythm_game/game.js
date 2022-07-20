// note peroidically falls down
const speed = 1.5;
const stop_time = 200; 
const interval = 50;
// available keys
const keys = ['a','s','d','f','h','j','k','l'];
var second = 0;
var id_num = 0;
var notes_a = []; // pair element: div + create time
var notes_s = [];

let combo_num_span = document.getElementById("combo_num");
let combo_num = 0;
// time function
var timeID = window.setInterval(() => {
    second += 1*speed;

    // add notes every 10 sec
    var track_a = document.getElementById("track_a");
    var track_s = document.getElementById("track_s");
    if((second % 10 == 0) || (second % 15 == 0))
    {
        // add to track a
        if(second % 10 == 0)
        {
            let newNote = document.createElement("div");
            newNote.classList.add("note");
            newNote.style.top = '0%';
            track_a.appendChild(newNote);
            notes_a.push(newNote);
            notes_a.push(second);
        }
        
        // add to track s
        if(second % 15 == 0)
        {
            let newNote = document.createElement("div");
            newNote.classList.add("note");
            newNote.style.top = '0%';
            track_s.appendChild(newNote);
            notes_s.push(newNote);
            notes_s.push(second);
        }
    }
    
    // every note drop down by time
    let i = 0;
    let all_notes = [notes_a, notes_s];
    
    for(let n=0; n<all_notes.length; n++)
        for (i=0; i<all_notes[n].length; i += 2)
        {
            let notes = all_notes[n];
            let note = notes[i];
            let top_int = second - notes[i+1];
            note.style.top = `${top_int}%` ;
            // reach judge line
            if(top_int > 80)
            {
                // miss
                // update combo
                combo_num = 0;
                combo_num_span.innerText = `${combo_num}`;
                combo_num_span.style.color = "white";

                let text = document.getElementById(`score_${keys[n]}`);
                // add miss text
                text.innerText = "MISS";
                text.classList.add("miss");

                // clear effect after a period
                window.setTimeout(()=>{
                    text.classList.remove("miss");
                }, 500/speed);
                // remove the poped note 
                (notes.splice(i,1)[0]).remove();
                notes.splice(i,1);
                i-=2;
            }  
        }

    // stop timer
    if(second >= stop_time)
    {
        window.clearInterval(timeID);
    }
}, interval);      


// detect if pressed
var isPressed = {};
for(let k of keys)
    isPressed[k] = false;

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

        // detect perfect, good, bad or miss
        // detect on the closet note
        let this_notes = [];
        if(e.key == 'a')
            this_notes = notes_a; // pass reference 
        else if(e.key == 's')
            this_notes = notes_s;
        
        let top_int = second - this_notes[1];
        
        if(!isPressed[e.key])
        {
            let text = document.getElementById(`score_${e.key}`);
            // judged good
            if(top_int >= 75 && top_int <= 77)
            {
                jl.classList.add("judge_line_good");
                // add good text
                text.innerText = "GOOD";
                text.classList.add("good");
                // update combo
                combo_num += 1;
                combo_num_span.innerText = `${combo_num}`; 
                if(combo_num_span.style.color == "gold")
                    combo_num_span.style.color = "rgb(8, 142, 225)";
                // clear effect after a second
                window.setTimeout(()=>{
                    text.classList.remove("good");
                    jl.classList.remove("judge_line_good");
                }, 500/speed);
                // remove note
                (this_notes.splice(0,1)[0]).remove();
                this_notes.splice(0,1);
            }
            // perfect
            else if(top_int >= 78 && top_int <= 80)
            {
                // judge line
                jl.classList.add("judge_line_perfect");
                // add perfect text
                text.innerText = "PERFECT";
                text.classList.add("perfect");
                // update combo
                combo_num += 1;
                combo_num_span.innerText = `${combo_num}`; 
                // clear effect after a second
                window.setTimeout(()=>{
                    text.classList.remove("perfect");
                    jl.classList.remove("judge_line_perfect");
                }, 500/speed);
                // remove note
                (this_notes.splice(0,1)[0]).remove();
                this_notes.splice(0,1);
            }
        }
    }
});

// detect if pressed
window.addEventListener("keypress", (e) =>{
    isPressed[e.key] = true;
});

// back off when release keyboard
window.addEventListener("keyup", (e) => {
    if(keys.includes(e.key))
    {
        let jl = document.getElementById("jl_" + e.key);
        let bt = document.getElementById("bt_" + e.key);
        // release key
        isPressed[e.key] = false;
        
        // if pressed
        if(jl.classList.contains("judge_line_pressed"))
            jl.classList.remove("judge_line_pressed");
        bt.style.color = 'aquamarine'; 
    }
});

