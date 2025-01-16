type NoteProps = {
    children: React.ReactNode
};

function Note({children}: NoteProps) {
    return (
        <div className="note">
            {children}
        </div>
    );
}

export default Note;
