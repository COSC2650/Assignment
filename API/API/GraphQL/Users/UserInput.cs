namespace API.GraphQL.Users
{
    public record AddUserInput(
        string UserFirstName,
        string UserLastName,
        string UserStreet,
        string UserCity,
        string UserState,
        int UserPostCode,
        string UserEmail,
        string UserPassword);
}