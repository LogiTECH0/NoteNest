public class NoteDto
{
    public required string name { get; set; }
    public string? content { get; set; }
    public bool isDone { get; set; } = false;
    public required string date { get; set; }
    public required string Color { get; set; } = "#ffffff";
    public required string TextColor { get; set; } = "#0B0B0B";
}