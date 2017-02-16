import NoOpObjectVerifier from "./NoOpObjectVerifierSuperclass";
import NoOpStringVerifier from "./NoOpStringVerifier";

// DESIGN:
// * NoOpObjectVerifierSuperclass declares NoOpObjectVerifier without any circular dependencies.
// * First we load NoOpObjectVerifierSuperclass.
// * Next we load the circular dependencies (classes that depend on NoOpObjectVerifier and vice-versa).
// * Finally, we add methods to ObjectVerifier that reference the circular dependencies.

/**
 * @return {NoOpStringVerifier} a verifier for the object's string representation
 */
NoOpObjectVerifier.prototype.asString = function()
{
	return new NoOpStringVerifier();
};

export default NoOpObjectVerifier;