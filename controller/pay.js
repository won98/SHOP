const paypal = require("paypal-rest-sdk");
const db = require("../db/db");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AR4moHntLHkHJBgAFG-4P3rTpYdBLerA79-yuY8Zu0Qg3TyoYD4hcbHbteTpL52TNLRSNOgFecV15ysx",
  client_secret:
    "EIOmcp463v0IbL-afCfAVGAhHt0L481QgidNt8dzd30jduoZta40Jnoyf1FfeJIVHB1r5UVS93PXu8Xf",
});

module.exports = {
  GetURI: async (req, res) => {
    try {
      const { amount } = req.body;

      const pay_req = json.stringify({
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_url: {
          return_url: "http://localhost:8000/success",
          cancel_url: "http://localhost:8000/failed",
        },
        transactions: [
          {
            amount: { total: `${amount}`, currency: "USD" },
            description: "SHOP",
          },
        ],
      });
      await paypal.payment.create(pay_req, (error, payment) => {
        if (error) console.log(error);
        const links = {};
        payment.links.forEach((linkObj) => {
          links[linkObj.rel] = {
            href: linkObj.href,
            method: linkObj.method,
          };
        });
        if (links.hasOwnProperty("approval_url")) {
          const link = links["approval_url"].href;
          return res.send(link);
        } else {
          console.log("url_error");
        }
      });
    } catch (err) {
      throw console.log(err);
    }
  },
  Pay_ok: async (req, res) => {
    try {
      const { paymentId, payerId, id, p_price, p_name } = req.body;
      paypal.payment.execute(paymentId, payerId);
      async (error, payment) => {
        if (error) console.log(error);
        if (payment.state === "approved") res.send("1");
        const sql =
          "insert into pay (p_name,p_price,pg_name,id) values(?,?,?,?)";
        const data = [p_name, p_price, "paypal", id];
        const conn = await db.getConnection();
        const rows = await conn.query(sql, data);
        if (rows) return res.status(200).jason({ result: true });
        else throw res.send("failed");
      };
    } catch (err) {
      throw console.log(err);
    }
  },
};
