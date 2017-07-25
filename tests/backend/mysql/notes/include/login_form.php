<!--
     when including this, you also want the
     value_snippet.php for value() and value_password()
   -->
<div id="login-menu" class="menu centered">
    <!-- title -->
    <div class="title">
	Log In
    </div>

    <!-- form -->
    <form method="post" class="form centered">
	<div class="form-group">
	    <input type="text" name="username_login"
		   placeholder="Username"
		   class="form-control"
	    <?php
	    value("submit_login", "username_login");
	    ?>>
	</div>
	<div class="form-group">
	    <input type="password" name="password_login"
		   placeholder="Password"
		   class="form-control"
	    <?php
	    value_password("submit_login", "password_login");
	    ?>>
	</div>
	<input type="submit" value="Log In"
	       name="submit_login" class="btn btn-default">
    </form>

    <!-- footer -->
    <div class="footer">
	Don't have an account? Sign up
	<a href="signup.php">here</a>.
    </div>
</div>
