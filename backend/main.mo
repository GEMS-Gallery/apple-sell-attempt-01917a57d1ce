import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";

actor {
  type Product = {
    id: Nat;
    name: Text;
    description: Text;
    price: Nat;
    features: [Text];
    specs: [(Text, Text)];
  };

  stable var nextId: Nat = 0;
  let productStore = HashMap.HashMap<Nat, Product>(10, Nat.equal, Hash.hash);

  public func addProduct(name: Text, description: Text, price: Nat, features: [Text], specs: [(Text, Text)]) : async Nat {
    let id = nextId;
    nextId += 1;
    let product: Product = {
      id;
      name;
      description;
      price;
      features;
      specs;
    };
    productStore.put(id, product);
    id
  };

  public query func getProduct(id: Nat) : async ?Product {
    productStore.get(id)
  };

  public func updateProduct(id: Nat, name: Text, description: Text, price: Nat, features: [Text], specs: [(Text, Text)]) : async Result.Result<(), Text> {
    switch (productStore.get(id)) {
      case (null) {
        #err("Product not found")
      };
      case (?existingProduct) {
        let updatedProduct: Product = {
          id;
          name;
          description;
          price;
          features;
          specs;
        };
        productStore.put(id, updatedProduct);
        #ok()
      };
    }
  };

  public query func getAllProducts() : async [Product] {
    Iter.toArray(productStore.vals())
  };

  system func preupgrade() {
    if (productStore.size() == 0) {
      let defaultProduct: Product = {
        id = 0;
        name = "iPhone Android Edition";
        description = "Experience the best of both worlds with our iPhone Android Edition.";
        price = 999;
        features = ["Android-like interface", "iOS performance", "Customizable home screen", "App drawer"];
        specs = [("Display", "6.1-inch OLED"), ("Processor", "A15 Bionic"), ("Storage", "128GB"), ("Camera", "Dual 12MP system")];
      };
      productStore.put(0, defaultProduct);
      nextId := 1;
    };
  };

  system func postupgrade() {
    nextId := Nat.max(nextId, productStore.size());
  };
}
