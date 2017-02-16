import ObjectVerifier from "./ObjectVerifierSuperclass";
import StringVerifier from "./StringVerifier";
import Utilities from "./Utilities";

// DESIGN:
// * ObjectVerifierSuperclass declares ObjectVerifier without any circular dependencies.
// * First we load ObjectVerifierSuperclass.
// * Next we load the circular dependencies (classes that depend on ObjectVerifier and vice-versa).
// * Finally, we add methods to ObjectVerifier that reference the circular dependencies.

/**
 * @return {StringVerifier} a verifier for the object's string representation
 */
ObjectVerifier.prototype.asString = function()
{
	return new StringVerifier(this.config, Utilities.toString(this.actual), this.name + ".asString()");
};

export default ObjectVerifier;