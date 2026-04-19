public class UpdatedNoteDto
{
    public required string Name { get; set; }
    public string? Content { get; set; }
    public bool isDone { get; set; }
    public required string Date { get; set; }
    public required string Color { get; set; }
    public required string TextColor { get; set; }

    public int ColumnId { get; set; } 
    public Column? Column { get; set; }
}