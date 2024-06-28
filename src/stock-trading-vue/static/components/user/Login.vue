<template>
    <div class="form-login position-relavite text-center">
        <form class="position-absolute top-50 start-50 translate-middle col-8 col-sm-6 col-md-4 col-lg-4">
            <h1 class="h3 mb-3 fw-normal">Stock Trading Vue</h1>

            <!-- form.email -->
            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <!-- /form.email -->

            <!-- form.password -->
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <!-- /form.password -->

            <!-- form.remember_me -->
            <div class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
            </div>
            <!-- /form.remember_me -->

            <!-- form.submit -->
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <!-- /form.submit -->
        </form>
    </div>
</template>
