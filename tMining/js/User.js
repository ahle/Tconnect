tMining = {};

// this is the class of user assistance
tMining.User = function(trace){
	// 
    this.hasFeedback = undefined;// true or false
    // there is no contraint about what the user can do
    // the user could start from any state and 
    this.state = undefined;// reading, finding, idle, making decision, abort
    //
	
	
	
	
};

tMining.Action = function(trace){



}


tMining.PriorEpisodes = function(trace){
    // correction & validation
    let rules = ["correction","validation"];


}

// the definition of UI
tMining.UI = function(trace){
    this.knowledge = {
        "selector": "[role]"
    };

    this.hasUndo = true;
    this.location = "url";
    this.timeIndex = 0;// attributes
    this.revision= 0;// the revision of UI


}

tMining.Action = function(){
    this.commit = false;// these attributes can observed by using UI diff algorithm
    this.stage = false;// these attributes can observed by using UI diff algorithm    

    // command
    this.command = "abc";// Ctrl-C, Ctrl-V, mouse click

    // semantic action
    this.semantic = "open a document";// these attributes can observed
    
    // root action
    // an action is called a root, if its following actions change theirs effects on the user interface.

    // parentAction
    this.rootAction = "";// these attribues can be observed

    // examples of the rootAction are: Ctrl-V (visual mode), <ESC> (normal mode), : (commandmode).
    
    // update, internal state of action
    this.update = false;

    // 

}

tMining.Cursor = function(){

}

tMining.LocalWindow = function(){
    this.type = true;// selectedText, cursor, no cursor
    this.size = 100;
    this.shape = "rectangle";// circle, F, etc. These shapes based on eyetracking patterns

    // output, UI config    
}

// the time slot, using checkpoint timeslot which helps analysing better the system
// If exists a state which is (equivalent) similar with the following ones, called root timeslot
// the concept
// In the set of equivalent events, we could have a set of identical properties.
// The earliest in this event sequence, called the context based on first observation.
// the event in this timeslot, used to refer as the start of continuing task.
// However, in the context of multimodal, it could be harder.
// The reason is after the action which change the modal, the semantic of the action could be very different.
// How to deal with that ?
// The best way to reproduce the experience based on event sequence is finding an occurrence which is similar with the considered occurence.
// Usually the event type named = the event source [mouse, key] + the used action [click, move, press] + the effects of the actions [down, up, over, in, out]
// These elements in the event name is the concept for the programer who reacts with the change from outside of their systems [browser].
// The use the event type in this way helps the developer to write the code.
// But it doesn't help the reasoning in user experience reuse.
// Because finding the action chaining is not the objective of user assistance
// For example: Edit, Edit, Correction, Validation, Open a document, etc....

// What an user assistance notify to user
// It should be like: Open a document "X", Edit a word "A", etc...
// Or it should be like: Go to the "visual mode", do something etc...

// But it doesn't work if we let like this
// 



// Reuse the user experience, in other word, it's harder than it's sound.
// The big obstacle to reuse the user experience is finding the equivalent UI config more than an occurence of an event.
// Which ensure the reproduction of user experience is approriate with user.

// an UX is replayable if 


// In the given window [t_i,t_j], the 
// 


// The similarity in event sequence
// remove the timestamps, keep the order => episode

// To replay the user experience.
// some questions raise
// In which condition, the user experience can replay
// This question is hard to answer, in strict the user experience is quite unique.
// a UX is a order of the event occurences to user at the start time of UX.
// The factors to ensure the ux can replay is that all occurences can happen at another time slot.
// The location of UI    
// However, there are some techniques which reduce the specification of user experience.
// 

// The similarity in user config is another story.
// Two UIs are equivalent if 

// Just think about the design patterns.
// An agent learns something but it doesn't know how to use it and when to use it.
// 


tMining.UICheckpoint = [T1, T2];
// 



tMining.Event = function(trace){
    this.srcElement = "";
    
}

tMining.EditEvent = function(){
    this.before = "A";
    this.after = "B";
}

tMining.ChangeModeEvent = function(){
    this.VisualMode = "";
    this.InsertMode = "";
    this.CommandMode = "";
    this.NormalMode = "";
}

tMining.HeuristicReasoning = function(){
    
    this.removeSubject = function(trace){

    }

    this.removeTimeStamp = function(trace){// removeTimeStamp but keep the order
        
    }

    // monotone is that: if C is ok, does't check it in the future
    // anti-monotone is that: if C is ok, then sub-patterns are ok too
    // 
    this.removeMonocity = function(){// anti-monotonicity

    }

    // remove the revisions in user assistance reasoning
    // which quickly answer the user assistance request
    // 
    this.removeRevision = function(){

    }

}

tMining.Rule = function(){
    this.monocity = true;// fluent


}

// object which manages TimeSlot
tMining.TimeSlot = function(){


}


tMining.Application = function(){
    // the application changes
    this.verion = "Major.Minor.Update.Build";
    this.update = function(){

    }
    // 

}




