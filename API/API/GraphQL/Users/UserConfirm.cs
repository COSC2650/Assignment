namespace API.GraphQL.Users
{
    public record Confirm(
        string UserEmail,
        int ConfirmationCode
    );
}