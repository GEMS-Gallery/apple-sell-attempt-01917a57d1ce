export const idlFactory = ({ IDL }) => {
  const Product = IDL.Record({
    'id' : IDL.Nat,
    'features' : IDL.Vec(IDL.Text),
    'name' : IDL.Text,
    'description' : IDL.Text,
    'specs' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'price' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'addProduct' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Vec(IDL.Text),
          IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
        ],
        [IDL.Nat],
        [],
      ),
    'getAllProducts' : IDL.Func([], [IDL.Vec(Product)], ['query']),
    'getProduct' : IDL.Func([IDL.Nat], [IDL.Opt(Product)], ['query']),
    'updateProduct' : IDL.Func(
        [
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Vec(IDL.Text),
          IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
        ],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
