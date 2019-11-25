var input_text;
var document_id = {};
var parahs;
var orig_parahs;
var word_count = {};
var wordlist;
var index = {};
var searchWord;

/*
- Takes input text box content and displays it in the response box
- Called on clicking the "Submit text" button
*/
function displayInput(){
    input_text = document.getElementById('input-box').value;
    document.getElementById('response-box').innerHTML = input_text;
}

/*
- Converts input to documents and generates a unique id for each
- Called on clicking the "Get Document Indexes" button
*/
function getDocuments(){
    document.getElementById('response-box').innerHTML = "";
    //split the input text into separate paragraphs
    parahs = input_text.split('\n\n\n');
    //generate unique document id
    for(let i=0; i<parahs.length; i++){
        var doc_id = "docid_" + String(i+1);
        document_id[doc_id] = i;
    }
    //display ids and documents in response box
    for(let i=0; i<parahs.length; i++){
        document.getElementById('response-box').insertAdjacentHTML('beforeend',Object.keys(document_id)[i]+": "+parahs[i]+"\n\n");
    }
}

/* 
- Used to index the documents based on the input_doc_id entered by user
- Called on clicking the "Index paragraph" button
*/
function indexDocument(){
    document.getElementById('response-box').innerHTML = "";
    var input_id = document.getElementById('input_doc_id').value;
    //get the paragraph number document_id to index parahs
    var c = document_id[input_id];
    if(input_id==""){
        document.getElementById('response-box').innerHTML = "Enter some id to index";
    } else if(c===undefined){
        document.getElementById('response-box').innerHTML = "No such document";
    }
    else {
        document.getElementById('response-box').insertAdjacentHTML('beforeend', input_id+": " + parahs[c]);
    }
}


//Function that is equivalent to the dictionary.get() method in Python
function get(obj, key, defaultVal){
    var result = obj[key];
    return (typeof result!=="undefined")? result : defaultVal;
}

//Function to calculate the frequency of words in each document
function wordCount(){
    for(let [c,word] of wordlist.entries()){
        if(get(word_count, word, "false")==="false"){
            word_count[word] = 1;
        }
        else {
            word_count[word] += 1;
        }
    }
}

/*
- Function to calculate create/update the index using all the words in the input
- Called on clicking the "Generate Inverted Index" button
*/
function calculateIndex(){
    orig_parahs = Object.assign([], parahs);
    for(let i=0; i<parahs.length; i++){
        //remove special characters and convert to lower case
        var tempString = parahs[i].replace(/[123]|[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        parahs[i] = tempString.toLowerCase();
    }

    //for each paragraph, update word_count with the frequency of words
    for(let [count, doc] of parahs.entries()){
        word_count = {};
        wordlist = doc.split(' ');
        wordCount();
        //use word_count for the paragraph to add/update frequency and occurrence of index[word]
        for(let [c,word] of wordlist.entries()){
            if(get(index, word, "false")==="false"){
                var freq = word_count[word];
                var idp = Object.keys(document_id)[count];
                //index is of the form {word:{freq:doc_id}}
                index[word] = {};
                index[word][freq] = idp;
            }
            else{
                var freq = word_count[word];
                var idp = Object.keys(document_id)[count];
                index[word][freq] = idp;
            }
        }
    }
}

/*
Function to get documents ids for the top documents containing the input_search_word
Called by invertedIndexing()
*/
function getTopTen(searchWord, arr){
    occ_doc = []
    for(let [c,key] of arr.entries()){
        occ_doc.push(index[searchWord][key]);
    }
    return occ_doc;
}

/* 
- Used the perform the inverted indexing using the input_search_word
- Called on clicking the "Get top 10 paragraphs containing word occurence" button
*/
function invertedIndexing(){
    document.getElementById('response-box').innerHTML = "";
    searchWord = document.getElementById('input_search_word').value;
    searchWord = searchWord.toLowerCase();
    //get 10 instances of highest occurrence of the word
    occ_freq = Object.keys(index[searchWord]);
    occ_freq = occ_freq.map(Number);
    occ_freq.reverse();
    if(occ_freq.length > 10){
        occ_freq = occ_freq.slice(0,10);
    }
    occ_doc = getTopTen(searchWord, occ_freq);
    
    //display the results in the response box
    document.getElementById('response-box').insertAdjacentHTML('beforeend', "\nOccurrences of \""+searchWord+"\"\n\n");
    for(let [c,did] of occ_doc.entries()){
        var freq_count = occ_freq[c];
        var parah_no = document_id[did];
        var occ_string = String(freq_count)+" times in "+did+": ";
        document.getElementById('response-box').insertAdjacentHTML('beforeend', occ_string + orig_parahs[parah_no]+'\n\n');
    }
}