const express = require("express");
const Account = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique,
} = require("./accounts-middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await Account.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  async (req, res, next) => {
    try {
      const data = await Account.getById(req.params.id);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", checkAccountPayload, (req, res, next) => {
  Account.create({ account: req.account })
    .then((newAccount) => {
      res.status(201).json(newAccount.trim());
    })
    .catch((err) => {
      next(err);
    });
});

router.put(
  "/:id",
  checkAccountPayload,
  checkAccountId,
  async (req, res, next) => {
    try {
      const accountData = await Account.updateById(req.params.id, req.body);
      res.json(accountData);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", checkAccountPayload, async (req, res, next) => {
  try {
    const accountData = await Account.deleteById(req.params.id);
    res.json(accountData);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
