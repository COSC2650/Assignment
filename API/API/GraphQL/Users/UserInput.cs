namespace API.GraphQL.Users
{
    public record AddUserInput(
        string FirstName,
        string LastName,
        string Street,
        string City,
        string State,
        int PostCode,
        string Email,
        string Password);
}