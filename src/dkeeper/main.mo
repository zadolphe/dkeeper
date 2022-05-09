import List "mo:base/List";
import Debug "mo:base/Debug";

actor Dkeeper {

  public type Note = {
      title: Text;
      content: Text;
  };
  //a list that contain objects of type Note (an aarray)
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {

      let newNote: Note = {
        title = titleText; 
        content = contentText;
      };

      notes := List.push(newNote, notes);
      Debug.print(debug_show(notes));

  };

  //reading from blockchain is a lot faster when you dont need to modify anything and so here you can use query to just read the list note
  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  }; 

  public func removeNote(id: Nat) {
    //take, drop and append
    let listFront =  List.take(notes, id);
    let listblock = List.drop(notes, id+1);
    notes := List.append(listFront, listBack); 
    Debug.print("check this if oyu want for refresh");
  };

}