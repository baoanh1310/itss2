import React from 'react'

const SignIn = () => {
	return (
		<form>
            <h3>ログイン</h3>

            <div className="form-group">
                <label>メールアドレス</label>
                <input type="email" className="form-control" placeholder="メールアドレスを入力する" />
            </div>

            <div className="form-group">
                <label>パスワード</label>
                <input type="password" className="form-control" placeholder="パスワードを入力する" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">情報を保存する？</label>
                </div>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">ログイン</button>
            <p className="forgot-password text-center">
                <a href="#">パスワードをお忘れですか？</a>
            </p>
        </form>
	)
}

export default SignIn