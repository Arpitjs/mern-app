 let AuthForm = ({
    name, setName, email, setEmail, password, setPassword, about, setAbout, username, setUsername,
     secret, setSecret, submitting, submitRegister, submitLogin, page, forgotPassword, update, profileUpdate
}) => {
    return (
        <form>
           { page !== 'forgot' && <div>
            <div className="form-group p-2">
                <small><label className="text-muted">Your Name</label> </small>
                <input type="text" className="form-control" value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="enter name"></input>
            </div>
            {!profileUpdate && <div className="form-group p-2">
                <small><label className="text-muted">Password</label> </small>
                <input type="password" className="form-control" value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="enter password"></input>
            </div>}</div>}
            { page !== 'login' && <div>
            <div className="form-group p-2">
                <small><label className="text-muted">Email Address</label> </small>
                <input type="email" className="form-control" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="enter email"></input>
            </div>
           {profileUpdate && <>
            <div className="form-group p-2">
                <small><label className="text-muted">Username</label> </small>
                <input type="text" className="form-control" value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="enter username"></input>
            </div>
            <div className="form-group p-2">
                <small><label className="text-muted">About</label> </small>
                <input type="text" className="form-control" value={about}
                    onChange={e => setAbout(e.target.value)}
                    placeholder="about yourself."></input>
            </div>
            </>}
            <div className="form-group p-2">
                <small><label className="text-muted">Your Name</label> </small>
                <select className="form-control">
                    <option>what is your favorite color?</option>
                    <option>what is your favorite band?</option>
                    <option>what is your favorite club?</option>
                </select>
                <small className="form-text text-muted">
                    you can use this to reset your password.
                </small>
            </div>
            <div className="form-group p-2">
                <input type="text" className="form-control"
                    value={secret}
                    onChange={e => setSecret(e.target.value)}
                    placeholder="write your answer here."></input></div>
            </div>}
           {page !== 'forgot' && !profileUpdate && <div className="form-group p-2">
                {!submitting ? <button disabled={page === 'register' ? !name || !email || !secret || !password : !name || !password} 
                onClick={ page === 'register' ? submitRegister : submitLogin }
                    className="btn btn-primary col-12">Submit</button> : <button className="btn btn-primary col-12">Submitting...</button>}
            </div>}
          {page ==='forgot' && <div className="form-group p-2">
                {!submitting ? <button disabled={!email || !secret } 
                onClick={forgotPassword}
                    className="btn btn-primary col-12">Submit</button> : <button className="btn btn-primary col-12">Submitting...</button>}
            </div>}
            {profileUpdate && <div className="form-group p-2">
                {!submitting ? <button onClick={update}
                    className="btn btn-primary col-12">Update</button> : <button className="btn btn-primary col-12">Updating...</button>}
            </div>}
        </form>
    )
}

export default AuthForm