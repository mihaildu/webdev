<!--
     when including this, you also want the
     value_snippet.php for value() and value_password()
   -->
<div id="signup-menu" class="menu centered">
    <!-- title -->
    <div class="title">
	Sign Up
    </div>

    <!-- form -->
    <form method="post" class="form centered">
	<div class="form-group">
	    <input type="text" name="username_signup"
		   placeholder="Username"
		   class="form-control"
		   <?php
		   value("submit_signup", "username_signup");
		   ?>>
	</div>
	<div class="form-group">
	    <!--
		 fun fact, when submitting a form even with POST to
		 a server, the password is sent in plain text
		 it's a good idea to use passwords only on websites
		 that use HTTPS
	       -->
	    <input type="password" name="password_signup"
		   placeholder="Password"
		   class="form-control"
		   <?php
		   value_password("submit_signup", "password_signup");
		   ?>>
	</div>
	<div class="form-group">
	    <input type="email" name="email_signup"
		   placeholder="Email Address"
		   class="form-control"
		   <?php
		   value("submit_signup", "email_signup");
		   ?>>
	</div>
	<input type="submit" value="Sign Up"
	       name="submit_signup" class="btn btn-default">
    </form>

    <!-- footer -->
    <div class="footer">
	Already have an account? Log in
	<a href="login.php">here</a>.
    </div>
</div>
