let port = process.env.PORT;
if (port == null || port == "") {
    port = 8200;
}
app.listen(port);