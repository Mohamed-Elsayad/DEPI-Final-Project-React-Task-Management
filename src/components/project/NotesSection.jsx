import React from 'react';

const NotesSection = ({ selectedProject, handleAddNote, handleDeleteNote, newNote, setNewNote, calculateTimeAgo }) => {
  return (
    <div className="notes-section">
      <form onSubmit={handleAddNote} className="note-form">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          required
        />
        <button type="submit" className="submit-btn">Add Note</button>
      </form>
      <div className="notes-list">
        {selectedProject.notes.map(note => (
          <div key={note.id} className="note-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p>{note.content}</p>
              <span className="note-date">{calculateTimeAgo(note.createdAt)}</span>
            </div>
            <button className="delete-btn" onClick={() => handleDeleteNote(note.id)} style={{ marginLeft: '16px', height: '32px' }}>Delete Note</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesSection; 