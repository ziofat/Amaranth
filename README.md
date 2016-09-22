# Amaranth
[![npm](https://img.shields.io/npm/v/amaranth.svg?maxAge=3600&style=flat-square)](https://github.com/ziofat/Amaranth)
[![CircleCI](https://img.shields.io/circleci/project/ziofat/Amaranth.svg?maxAge=3600&style=flat-square)](https://circleci.com/gh/ziofat/Amaranth/tree/master)
[![codecov](https://img.shields.io/codecov/c/github/ziofat/Amaranth.svg?maxAge=3600&style=flat-square)](https://codecov.io/gh/ziofat/Amaranth)

A password management tool without storing them.
It is Safe and Rememberable.

# Introduction
We all know that using same password everywhere is extremly unsafe because websites cannot be trusted to protect them from hackers. So once one of your password is leaked, the other accounts are still safe.

However, it is impossible to remember all passwords for different websites. So there are several solutions for password management, like [LastPass](https://lastpass.com/), [1Password](https://1password.com/) or [KeePass](http://keepass.info/). 

But is they really safe? LastPass had been hacked. Keep them local? You must synchronize manually. How can we balance the safety and convenience?

Amaranth provide a simple password management solution. You just need to remember only one password (we call it main password), and setting different site id for accounts on different sites (you can just use the brand name like google or apple). Amaranth will calculate the password for you.

Only you have main password, and site id, Amaranth can calculate correct password for you. If any of this 2 is wrong, Amaranth will provide different password. The benifit of this is that you only need to remember this specific main password IN YOUR BRAIN, and Amaranth can give you any password you need at any devices without synchronization and storage.

![Algorithm](https://cloud.githubusercontent.com/assets/8521174/18719327/526f6a38-806a-11e6-8e0a-81cb2c79510b.png)

So Amaranth is unhackable because it dose not store any of your password. It just provide an algorithm to generate them.

It also come with different type of password in case there is requirement in websites or services. For example, some website require longer password length (more than 10) but some service (like bank) require PIN as password. Amaranth provides 4 kinds of passwords which is PIN, Short, Classic and Long.

![Long Password](https://cloud.githubusercontent.com/assets/8521174/18719349/66d355de-806a-11e6-9ae5-ea336014e826.png)

According to [HOW SECURE IS MY PASSWORD?](https://howsecureismypassword.net/), the Long type password needs 3 TRILLION YEARS to crack (2016).

![PIN Password](https://cloud.githubusercontent.com/assets/8521174/18719352/68d58d34-806a-11e6-99c5-df9421832730.png)

The benifits of using Amaranth:
- Safe, unhackable. Even your computer is stolen, the password will never leak.
- Easy to remember. User just need to remember a main password and a rule of site id.
- Main password is only used to generate password, never used in actual websites.
- No need to think a new password for new account.

There is also a shortcoming, if you choose this solution, you need to change your current passwords.

# Usage
There will be a Chrome extension for this.

This repository is for algorithm. To check it, just

```npm install amaranth```

and in your nodejs file:
```javascript
const amaranth = require('amaranth');
const password = amaranth('main password', 'site id', 'Long');
// amaranth(mainPassword, siteId, passwordType);
```

Currently Amaranth support 4 types of password:
- PIN: 4 digit
- Short: 1 uppercase characters, 2 lowercase characters, 1 digit
- Classic: 2 uppercase characters, 3 lowercase characters, 2 digit, 1 punctuation
- Long: 4 uppercase characters, 6 lowercase characters, 4 digit, 2 punctuation

# Author
Daniel Li

# License
See LICENSE file.